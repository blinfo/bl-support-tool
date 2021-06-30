package se.bjornlunden.blappadminapi.services.implementations;

/**
 * @author Patrik Holmkvist on 2020-11-11
 */
public class SpecificationService {

    public static boolean isNumeric(final String str) {
        try {
            Long.parseLong(str);
        } catch (final NumberFormatException e) {
            return false;
        }
        return true;
    }

    public static boolean isNullOrEmpty(String s) {
        return s == null || s.equals("");
    }
}
