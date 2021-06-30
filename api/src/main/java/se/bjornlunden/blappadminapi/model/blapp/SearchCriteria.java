package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Data;

/**
 * @author Patrik Holmkvist on 2020-10-07
 */
@Data
public class SearchCriteria {
    private String key;
    private String operation;
    private Object value;
}
