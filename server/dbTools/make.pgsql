INSERT INTO users (id, user_name)
VALUES
  ('user_12345', 'John Doe'),
  ('user_67890', 'Jane Doe')
;

INSERT INTO plants (id, user_id, plant_name)
VALUES 
  ('plant_1', 'user_12345', 'Cilantro'),
  ('plant_2', 'user_12345', 'Arugula'),
  ('plant_3', 'user_67890', 'Carrots')
;