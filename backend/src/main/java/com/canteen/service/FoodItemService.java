package com.canteen.service;

import com.canteen.model.FoodItem;
import com.canteen.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public FoodItem getFoodItemById(Long id) {
        return foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food item not found with id: " + id));
    }

    public List<FoodItem> getFoodItemsByCategory(String category) {
        return foodItemRepository.findByCategoryIgnoreCase(category);
    }

    public List<FoodItem> searchFoodItems(String keyword) {
        return foodItemRepository.findByNameContainingIgnoreCase(keyword);
    }

    public FoodItem createFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    public FoodItem updateFoodItem(Long id, FoodItem updatedItem) {
        FoodItem existing = getFoodItemById(id);
        existing.setName(updatedItem.getName());
        existing.setDescription(updatedItem.getDescription());
        existing.setCategory(updatedItem.getCategory());
        existing.setPrice(updatedItem.getPrice());
        existing.setImageUrl(updatedItem.getImageUrl());
        return foodItemRepository.save(existing);
    }

    public void deleteFoodItem(Long id) {
        if (!foodItemRepository.existsById(id)) {
            throw new RuntimeException("Food item not found with id: " + id);
        }
        foodItemRepository.deleteById(id);
    }
}
