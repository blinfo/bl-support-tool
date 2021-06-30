package se.bjornlunden.blappadminapi.dto.blapp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Patrik Holmkvist on 2021-05-18
 */
@Data @AllArgsConstructor @NoArgsConstructor
public class SolutionStats {
   private Long id;
   private String name;
   private Double price;
   private Double additionalSubscriptionPrice;
   private Long subscribers;
   private Long allInclusiveSubscribers;
   private Double totalCost = 0.0;
}
