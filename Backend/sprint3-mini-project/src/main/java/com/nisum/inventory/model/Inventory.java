package com.nisum.inventory.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "productinventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {

    @Id
    @Column(name = "SKU")
    private String sku;

    @Column(name = "ProductID")
    private Integer productId;

    @Column(name = "CategoryID")
    private Integer categoryId;

    @Column(name = "Location")
    private String location;

    @Column(name = "Quantity")
    private Integer quantity;

    @Column(name = "OrderID")
    private Integer orderId;

    @Column(name = "IsCancelled")
    private Boolean cancelled;

    @Column(name = "OrderAllocatedQty")
    private Integer allocated;

    @Column(name = "OrderReservedQty")
    private Integer reserved;
}
