"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "lucide-react";
import Hint from "../../components/hint";

const Address = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      fullAddress: "123 Main St, Anytown USA",
      isDefault: true,
    },
    {
      id: 2,
      label: "Work",
      fullAddress: "456 Work St, Cityville USA",
      isDefault: false,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", fullAddress: "" });
  const [editingAddress, setEditingAddress] = useState(null);

  const openAddDialog = () => {
    setNewAddress({ label: "", fullAddress: "" });
    setEditingAddress(null);
    setIsAddDialogOpen(true);
  };

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.fullAddress) {
      setAddresses([
        ...addresses,
        { id: Date.now(), ...newAddress, isDefault: false },
      ]);
      setNewAddress({ label: "", fullAddress: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress({ ...address });
    setIsAddDialogOpen(true);
  };

  const handleUpdateAddress = () => {
    if (editingAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id ? editingAddress : addr,
        ),
      );
      setEditingAddress(null);
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id
          ? { ...addr, isDefault: true }
          : { ...addr, isDefault: false },
      ),
    );
  };

  return (
    <Card className="m-0 mx-auto w-full rounded-none border-0 p-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>All Saved Addresses</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white" onClick={openAddDialog}>
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={
                    editingAddress ? editingAddress.label : newAddress.label
                  }
                  onChange={(e) =>
                    editingAddress
                      ? setEditingAddress({
                          ...editingAddress,
                          label: e.target.value,
                        })
                      : setNewAddress({ ...newAddress, label: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="fullAddress">Full Address</Label>
                <Input
                  id="fullAddress"
                  value={
                    editingAddress
                      ? editingAddress.fullAddress
                      : newAddress.fullAddress
                  }
                  onChange={(e) =>
                    editingAddress
                      ? setEditingAddress({
                          ...editingAddress,
                          fullAddress: e.target.value,
                        })
                      : setNewAddress({
                          ...newAddress,
                          fullAddress: e.target.value,
                        })
                  }
                />
              </div>
              <Button
                onClick={
                  editingAddress ? handleUpdateAddress : handleAddAddress
                }
                className="w-full"
              >
                {editingAddress ? "Update Address" : "Add Address"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {addresses.map((address) => (
          <div key={address.id} className="mb-4 flex items-start space-x-4">
            <MapPinIcon className="mt-1 h-5 w-5 text-gray-500" />
            <div className="flex-grow">
              <h3 className="font-semibold">
                {address.label}{" "}
                {address.isDefault && (
                  <span className="text-sm text-green-600">(Default)</span>
                )}
              </h3>
              <p className="text-sm text-gray-600">{address.fullAddress}</p>
            </div>
            {!address.isDefault && (
              <Hint label="Set as default">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSetDefaultAddress(address.id)}
                >
                  <CheckCircleIcon className="h-4 w-4" />
                </Button>
              </Hint>
            )}{" "}
            <Hint label="Edit">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditAddress(address)}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            </Hint>
            <Hint label="Delete">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteAddress(address.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Address;
