package com.canteen.controller;

import com.canteen.model.FoodItem;
import com.canteen.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @GetMapping
    public ResponseEntity<List<FoodItem>> getAllFoodItems(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {

        List<FoodItem> items;

        if (category != null && !category.isEmpty()) {
            items = foodItemService.getFoodItemsByCategory(category);
        } else if (search != null && !search.isEmpty()) {
            items = foodItemService.searchFoodItems(search);
        } else {
            items = foodItemService.getAllFoodItems();
        }

        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItem> getFoodItemById(@PathVariable Long id) {
        return ResponseEntity.ok(foodItemService.getFoodItemById(id));
    }

    @PostMapping
    public ResponseEntity<FoodItem> createFoodItem(@RequestBody FoodItem foodItem) {
        return new ResponseEntity<>(foodItemService.createFoodItem(foodItem), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodItem> updateFoodItem(@PathVariable Long id, @RequestBody FoodItem foodItem) {
        return ResponseEntity.ok(foodItemService.updateFoodItem(id, foodItem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable Long id) {
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }
}
