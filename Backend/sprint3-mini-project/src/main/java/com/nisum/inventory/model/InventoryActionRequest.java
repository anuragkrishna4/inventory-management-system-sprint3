package com.nisum.inventory.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryActionRequest {
    private String sku;
    private String action;
    private Integer quantity;
    private Integer orderId;
}

