"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Plus, Loader2 } from "lucide-react";
import { QueryBodyParams } from "@/pages/api/query";
import { IsochroneFilter, poiValues } from "@/pages/api/poiValues";

const getUsedFilterValues = (
  filters: IsochroneFilter[],
  field: keyof IsochroneFilter,
) => {
  return filters.map((filter) => filter[field]);
};

interface IsochroneFilterFormProps {
  onSubmit: (params: QueryBodyParams) => Promise<void>;
}

export default function IsochroneFilterForm({
  onSubmit,
}: IsochroneFilterFormProps) {
  const [commuteFilters, setCommuteFilters] = useState<IsochroneFilter[]>([
    { poi: "ptv-stations", type: "foot-walking", method: "time", value: 30 },
  ]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [minBedrooms, setMinBedrooms] = useState<number>(1);
  const [propertyTypes, setPropertyTypes] = useState<("house" | "unit")[]>([
    "house",
    "unit",
  ]);
  const [revealForm, setRevealForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedFilters = localStorage.getItem("isochroneFilters");
    if (savedFilters) {
      const { commuteFilters, minPrice, maxPrice, minBedrooms, propertyTypes } =
        JSON.parse(savedFilters);
      setCommuteFilters(commuteFilters);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      setMinBedrooms(minBedrooms);
      setPropertyTypes(propertyTypes);
    }
  }, []);

  const priceOptions = [
    ...Array.from({ length: 20 }, (_, i) => i * 50000),
    ...Array.from({ length: 10 }, (_, i) => 1000000 + i * 100000),
  ];

  const handleAddFilter = () => {
    setCommuteFilters([
      ...commuteFilters,
      {
        poi: poiValues.filter((poi) => {
          return !commuteFilters.some((filter) => filter.poi === poi);
        })[0],
        type: "foot-walking",
        method: "time",
        value: 30,
      },
    ]);
  };

  const handleRemoveFilter = (index: number) => {
    setCommuteFilters(commuteFilters.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof IsochroneFilter,
    value: string | number,
  ) => {
    const newFilters = commuteFilters.map((filter, i) =>
      i === index ? { ...filter, [field]: value } : filter,
    );
    setCommuteFilters(newFilters);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const filterParams = {
      commuteFilters,
      minPrice,
      maxPrice,
      minBedrooms,
      propertyTypes,
    };
    localStorage.setItem("isochroneFilters", JSON.stringify(filterParams));
    await onSubmit(filterParams);
    setRevealForm(false);
    setIsLoading(false);
  };

  const handlePropertyTypeChange = (type: "house" | "unit") => {
    setPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  console.log(commuteFilters);
  const usedPoiValues = getUsedFilterValues(commuteFilters, "poi");

  return (
    <Card
      className={`h-full transform ${
        revealForm ? "translate-x-0" : "-translate-x-[95%]"
      } transition-transform duration-300 pt-6`}
      onClick={() => setRevealForm(true)}
    >
      <form onSubmit={handleSubmit} className={""}>
        <CardContent className="flex flex-col gap-y-6 max-h-[80vh] overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Isochrone Filters</CardTitle>
            </CardHeader>
            <CardContent>
              {commuteFilters.map((filter, index) => (
                <div key={index} className="flex flex-col space-y-4 mb-6">
                  <div className={"flex space-x-2"}>
                    <Select
                      value={filter.poi}
                      onValueChange={(value) =>
                        handleChange(index, "poi", value)
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select POI" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="ptv-stations"
                          disabled={usedPoiValues.includes("ptv-stations")}
                        >
                          PTV Stations
                        </SelectItem>
                        <SelectItem
                          value="woolworths"
                          disabled={usedPoiValues.includes("woolworths")}
                        >
                          Woolworths
                        </SelectItem>
                        <SelectItem
                          value="coles"
                          disabled={usedPoiValues.includes("coles")}
                        >
                          Coles
                        </SelectItem>
                        <SelectItem
                          value="aldi"
                          disabled={usedPoiValues.includes("aldi")}
                        >
                          Aldi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={filter.type}
                      onValueChange={(value) =>
                        handleChange(index, "type", value)
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="foot-walking">Walking</SelectItem>
                        <SelectItem value="driving-car">Driving</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={filter.method}
                      onValueChange={(value) =>
                        handleChange(index, "method", value)
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="time">Time</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                      </SelectContent>
                    </Select>
                    {commuteFilters.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveFilter(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      Travel time under <b>{filter.value}</b> minutes
                    </div>
                    <Slider
                      min={5}
                      max={120}
                      step={5}
                      value={[filter.value]}
                      onValueChange={(value) =>
                        handleChange(index, "value", value[0])
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={handleAddFilter}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Filter
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Price Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="minPrice">Min price</Label>
                  <Select
                    value={minPrice.toString()}
                    onValueChange={(value) => setMinPrice(Number(value))}
                  >
                    <SelectTrigger id="minPrice">
                      <SelectValue placeholder="Select min price" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceOptions.map((price) => (
                        <SelectItem key={price} value={price.toString()}>
                          ${price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="maxPrice">Max price</Label>
                  <Select
                    value={maxPrice.toString()}
                    onValueChange={(value) => setMaxPrice(Number(value))}
                  >
                    <SelectTrigger id="maxPrice">
                      <SelectValue placeholder="Select max price" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceOptions.map((price) => (
                        <SelectItem key={price} value={price.toString()}>
                          ${price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bedrooms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-x-2">
                {[1, 2, 3, 4, 5].map((bedrooms) => (
                  <Button
                    key={bedrooms}
                    type="button"
                    variant={minBedrooms === bedrooms ? "default" : "outline"}
                    onClick={() => setMinBedrooms(bedrooms)}
                  >
                    {bedrooms}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Property Types</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-x-2">
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id="house"
                  checked={propertyTypes.includes("house")}
                  onCheckedChange={() => handlePropertyTypeChange("house")}
                />
                <Label htmlFor="house">House</Label>
              </div>
              <div className="flex items-center gap-x-2">
                <Checkbox
                  id="unit"
                  checked={propertyTypes.includes("unit")}
                  onCheckedChange={() => handlePropertyTypeChange("unit")}
                />
                <Label htmlFor="unit">Unit</Label>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className={"pt-6"}>
          <Button type="submit" className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Apply Filters"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
