package com.canteen.service;

import com.canteen.dto.OrderItemRequest;
import com.canteen.dto.OrderRequest;
import com.canteen.model.FoodItem;
import com.canteen.model.Order;
import com.canteen.model.OrderItem;
import com.canteen.repository.FoodItemRepository;
import com.canteen.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Transactional
    public Order createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setCustomerName(orderRequest.getCustomerName());
        order.setStatus("Pending");
        order.setTotalAmount(0.0);

        double totalAmount = 0;

        for (OrderItemRequest itemReq : orderRequest.getItems()) {
            FoodItem foodItem = foodItemRepository.findById(itemReq.getFoodItemId())
                    .orElseThrow(() -> new RuntimeException("Food item not found with id: " + itemReq.getFoodItemId()));

            double itemTotal = foodItem.getPrice() * itemReq.getQuantity();
            totalAmount += itemTotal;

            OrderItem orderItem = new OrderItem();
            orderItem.setFoodItem(foodItem);
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setPrice(itemTotal);
            orderItem.setOrder(order);

            order.getOrderItems().add(orderItem);
        }

        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    @Transactional
    public Order updateOrderStatus(Long id, String status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
