package com.nisum.inventory.service;

import com.nisum.inventory.exception.CustomException;
import com.nisum.inventory.model.Inventory;
import com.nisum.inventory.model.InventoryActionRequest;
import com.nisum.inventory.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Inventory addInventory(Inventory inventory) {
        inventory.setAllocated(0);
        inventory.setReserved(0);
        inventory.setCancelled(false);
        return inventoryRepository.save(inventory);
    }

    public Inventory performAction(InventoryActionRequest request) {
        String sku = request.getSku();
        String action = request.getAction().toLowerCase();
        int qty = request.getQuantity();

        Inventory inventory = inventoryRepository.findById(sku)
                .orElseThrow(() -> new CustomException("Inventory not found for SKU: " + sku));

        switch (action) {
            case "adjust" -> {
                if (qty < 0) throw new CustomException("Quantity cannot be negative.");
                inventory.setQuantity(qty);
            }

            case "cancel" -> {
                if (inventory.getQuantity() < qty) {
                    throw new CustomException("Not enough available quantity to cancel.");
                }
                inventory.setQuantity(inventory.getQuantity() - qty);
                inventory.setCancelled(true);
            }

            case "reserve" -> {
                if (inventory.getQuantity() < qty) {
                    throw new CustomException("Not enough stock available to reserve.");
                }
                inventory.setQuantity(inventory.getQuantity() - qty);
                inventory.setReserved(inventory.getReserved() + qty);
            }

            case "allocate" -> {
                if (inventory.getReserved() < qty) {
                    throw new CustomException("Not enough reserved quantity to allocate.");
                }
                inventory.setReserved(inventory.getReserved() - qty);
                inventory.setAllocated(inventory.getAllocated() + qty);
            }

            default -> throw new CustomException("Invalid action: " + action);
        }

        return inventoryRepository.save(inventory);
    }

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }
}
