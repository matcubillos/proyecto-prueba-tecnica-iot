CREATE OR REPLACE FUNCTION public.update_device_state()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_status TEXT;
BEGIN
    new_status := NEW."METRICS"->>'status';

    IF new_status IN ('Online', 'Offline', 'Warning') THEN
        UPDATE tbl_device
        SET "DEVICE_STATE" = new_status,
            "UPDATED_AT"   = NOW()
        WHERE "DEVICE_ID" = NEW."DEVICE_ID";
    END IF;

    RETURN NEW;
END;
$function$
