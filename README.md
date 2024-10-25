# suburb-walkability

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.29. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Running Python code

```bash
source venv/bin/activate
```


How to upload chunked data to oracle cloud

Requires the following environment variables to be set:

- `OC_USER` - Oracle Cloud user
- `OCI_FINGERPRINT` - Fingerprint of the public key
- `OCI_TENANCY` - Oracle Cloud tenancy
- `OCI_REGION` - Oracle Cloud region

You'll also need to have the key file in the same directory as the script, which you can get from Oracle Cloud

You can load .env file with the following command:

```bash
source ./scripts/load_env.sh
```

```
python script.py <filename> <bucket_name> <namespace_name> [chunk_size]
```

Example of the script usage:

```bash
python ./datasets/scripts/upload_chunk_data_to_oracle_cloud.py ./datasets/aldi-locations.csv aldi-locations axi7n4s6d44f 
```