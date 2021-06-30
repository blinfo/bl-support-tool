package se.bjornlunden.blappadminapi.model.blaapi;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author Patrik Holmkvist on 2021-01-27
 */
@Entity
@Table(name = "users")
@Getter
@Setter
public class CloudCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "database_name", length = 50)
    private String databaseName;

    @Column(name = "userid", length = 50)
    private String userId;

    @Column(name = "bla_password", length = 50)
    private String blaPassword;

    @Column(name = "ble_licence_key", length = 7)
    private String bleLicenceKey;

    @Column(name = "public_key", length = 50)
    private String publicKey;

    @Column(name = "system_note", length = 20)
    private String systemNote;

    @Column(name = "hidden", length = 1)
    private String hidden;

    @Column(name = "create_time")
    private String createTime;

    private Integer active;

    @Column(name = "deletion_information")
    private String deletionInformation;

    @Column(name = "paying_customer_number")
    private Long payingCustomerNumber;

    @Column(name = "firm_customer_number")
    private Long firmCustomerNumber;

    @Column(name = "allocating_customer_number")
    private Long allocatingCustomerNumber;

    @Column(length = 50)
    private String name;

    @Column(name = "org_number", length = 13)
    private String orgNumber;

    @Column(length = 50)
    private String email;

    @Column(length = 12)
    private String role;

    @Column(name = "host_id")
    private Integer hostId;

    @Column(name = "sandbox_service_provider_id")
    private Long sandboxSPId;

    @Column(name = "filearea_id")
    private String fileAreaId;
}
