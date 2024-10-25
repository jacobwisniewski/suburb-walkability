import oci
import pandas as pd
import os
import sys

def bucket_exists(client, namespace_name, bucket_name):
    try:
        client.get_bucket(namespace_name, bucket_name)
        return True
    except oci.exceptions.ServiceError as e:
        if e.status == 404:
            return False
        else:
            raise

def create_bucket(client, namespace_name, bucket_name):
    request = oci.object_storage.models.CreateBucketDetails()
    request.compartment_id = os.getenv("OCI_TENANCY")
    request.name = bucket_name
    client.create_bucket(namespace_name, request)

def chunk_csv_and_upload(filename, bucket_name, namespace_name, chunk_size=10000):
    config = {
        "user": os.getenv("OCI_USER"),
        "fingerprint": os.getenv("OCI_FINGERPRINT"),
        "key_file": os.path.join(os.getcwd(), "keys", "oci-private-key.pem"),
        "tenancy": os.getenv("OCI_TENANCY"),
        "region": os.getenv("OCI_REGION"),
    }

    if None in config.values():
        print("Error: One or more required OCI environment variables are not set.")
        sys.exit(1)

    object_storage_client = oci.object_storage.ObjectStorageClient(config)

    if not bucket_exists(object_storage_client, namespace_name, bucket_name):
        create_bucket(object_storage_client, namespace_name, bucket_name)
        print(f'Bucket {bucket_name} created.')

    for chunk_number, chunk in enumerate(pd.read_csv(filename, chunksize=chunk_size)):
        chunk_filename = f'{os.path.splitext(filename)[0]}_chunk_{chunk_number}.csv'

        chunk.to_csv(chunk_filename, index=False)

        try:
            with open(chunk_filename, 'rb') as f:
                object_name = os.path.basename(chunk_filename)
                object_storage_client.put_object(
                    namespace_name,
                    bucket_name,
                    object_name,
                    f
                )
            print(f'Successfully uploaded {chunk_filename} to bucket {bucket_name}')
        except Exception as e:
            print(f'Failed to upload {chunk_filename}: {e}')
        finally:
            os.remove(chunk_filename)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python script.py <filename> <bucket_name> <namespace_name> [chunk_size]")
        sys.exit(1)

    filename = sys.argv[1]
    bucket_name = sys.argv[2]
    namespace_name = sys.argv[3]
    chunk_size = int(sys.argv[4]) if len(sys.argv) > 4 else 10000

    chunk_csv_and_upload(filename, bucket_name, namespace_name, chunk_size)