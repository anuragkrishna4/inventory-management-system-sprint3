package com.nisum.inventory.controller;

import com.nisum.inventory.model.Inventory;
import com.nisum.inventory.model.InventoryActionRequest;
import com.nisum.inventory.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addInventory(@RequestBody Inventory inventory) {
        try {
            Inventory saved = inventoryService.addInventory(inventory);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/action")
    public ResponseEntity<Inventory> inventoryAction(@RequestBody InventoryActionRequest request) {
        Inventory updated = inventoryService.performAction(request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Inventory>> getInventoryTable() {
        List<Inventory> allInventories = inventoryService.getAllInventories();
        return ResponseEntity.ok(allInventories);
    }
}
