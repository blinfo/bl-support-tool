package se.bjornlunden.blappadminapi.services;

import org.junit.jupiter.api.Test;
import se.bjornlunden.blappadminapi.dto.blaapi.ScopeDTO;
import se.bjornlunden.blappadminapi.services.implementations.ScopeService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Patrik Holmkvist on 2021-04-12
 */
class ScopeServiceTest {
    private final String AVAILABLE_SCOPE_FROM_DB_1 = "[account:CREATE|READ|UPDATE|DELETE, archive:CREATE|READ|UPDATE|DELETE, article:CREATE|READ|UPDATE|DELETE, attestants:CREATE|READ|UPDATE|DELETE";
    private final String AVAILABLE_SCOPE_FROM_DB_2 = "[Batch:-|READ|-|-, Details:-|READ|-|-, FinancialYear:CREATE|READ|UPDATE|-, CustomerInvoice:CREATE|READ|UPDATE|-, " +
            "Customer:CREATE|READ|UPDATE|-, Order:CREATE|READ|UPDATE|-, Article:CREATE|READ|UPDATE|-]";

    private List<ScopeDTO> SCOPES_1;
    private List<ScopeDTO> SCOPES_2;

    public void init() {
        SCOPES_1 = List.of(
                new ScopeDTO("account", List.of("CREATE", "READ", "UPDATE", "DELETE")),
                new ScopeDTO("archive", List.of("CREATE", "READ", "UPDATE", "DELETE")),
                new ScopeDTO("article", List.of("CREATE", "READ", "UPDATE", "DELETE")),
                new ScopeDTO("attestant", List.of("CREATE", "READ", "UPDATE", "DELETE"))
        );
        SCOPES_2 = List.of(
                new ScopeDTO("batch", List.of("READ")),
                new ScopeDTO("details", List.of("READ")),
                new ScopeDTO("financialYear", List.of("CREATE", "READ", "UPDATE")),
                new ScopeDTO("customerInvoice", List.of("CREATE", "READ", "UPDATE")),
                new ScopeDTO("customer", List.of("CREATE", "READ", "UPDATE")),
                new ScopeDTO("order", List.of("CREATE", "READ", "UPDATE")),
                new ScopeDTO("article", List.of("CREATE", "READ", "UPDATE"))
        );
    }

    @Test
    public void checkLength() {
        ScopeService scopeService = new ScopeService();
        init();
        List<ScopeDTO> scopesOne = scopeService.getScopes(AVAILABLE_SCOPE_FROM_DB_1);
        List<ScopeDTO> scopesTwo = scopeService.getScopes(AVAILABLE_SCOPE_FROM_DB_2);
        assertEquals(SCOPES_1.size(), scopesOne.size());
        assertEquals(SCOPES_2.size(), scopesTwo.size());
    }
}
