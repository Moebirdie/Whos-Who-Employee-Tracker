  INSERT INTO department (name, is_active)
  VALUES ("Corporate", true),
        ("Human Resources", true),
        ("Mergers and Aquisitions", true),
        ("Real Estate Dev", true),
        ("Finance", true),
        ("Asset Management", true)
  ;


  INSERT INTO role (title, salary, department, is_active)
  VALUES ("President", 30000000, 1, true),
        ("Executive Assistant", 8000000, 1, true),
        ("HR manager", 25000000, 2, true),
        ("HR Specialist", 10000000, 2, true),
        ("HR Advisor", 15000000, 2, true),
        ("M&A Analyst", 4000000, 3, true),
        ("M&A Associate", 6000000, 3, true),
        ("M&A Vice President", 10000000, 3, true),
        ("M&A Director", 15000000, 3, true),
        ("M&A Managing Director", 25000000, 3, true),
        ("RED Specialist", 4000000, 4, true),
        ("RED Credit Analyst", 6000000, 4, true),
        ("RED Portfolio Manager", 10000000, 4, true),
        ("RED Vice President", 12500000, 4, true),
        ("RED Director", 15000000, 3, true),
        ("RED Managing Director", 22500000, 3, true),
        ("Chief Financial Officer", 25000000, 1, true),
        ("Accountant I", 6000000, 5, true),
        ("Accountant II", 7500000, 5, true),
        ("GL Technical Specialist", 8500000, 5, true),
        ("Finance Manager", 12500000, 5, true),
        ("Controller", 22500000, 5, true),       
        ("Chief Economist", 25000000, 1, true),
        ("Asset Management Specialist", 4000000, 6, true),
        ("Financial Analyst", 7000000, 6, true),
        ("Asset Manager", 10000000, 6, true),
        ("AM Vice President", 12500000, 6, true),
        ("AM Director", 15000000, 6, true),
        ("AM Managing Director", 22500000, 6, true)
  ;

    INSERT INTO employee (first_name, last_name, role_id, is_active)
  VALUES ("Ethan", "Smith", 1, true),
        ("Ava", "Johnson", 2, true),
        ("Logan", "Williams", 3, true),
        ("Olivia", "Brown", 4, true),
        ("Mason", "Jones", 5, true),
        ("Emma", "Garcia", 6, true),
        ("Benjamin", "Miller", 7, true),
        ("Isabella", "Davis", 8, true),
        ("Jackson", "Rodriguez", 9, true),
        ("Sophia", "Martinez", 10, true),
        ("William","Hernandez", 11, true),
        ("Mia", "Lopez", 12, true),
        ("James", "Gonzalez", 13, true),
        ("Gustav", "Sophos", 14, true),
        ("Juliana", "Ustav", 15, true),
        ("Riley", "Shaughnesssy", 16, true),
        ("Colin", "Murphy", 17, true),
        ("James","Flynn", 18, true),
        ("Antonio", "Palerma", 19, true),
        ("Marco","Bianchi", 20, true),
        ("Alessia", "Romano", 21, true),
        ("Chiara", "Ricci", 22, true),       
        ("Lorenzo", "Conti", 23, true),
        ("Pedro", "Santos", 24, true),
        ("Sofia", "Silva", 25, true),
        ("Lucas", "Oliveri", 26, true),
        ("Beatriz", "Costa", 27, true),
        ("Etienne", "Dupont", 28, true),
        ("Camille", "Laurent", 29, true),
        ("Oliver", "Martin", 18, true),
        ("Elise", "Rousseau", 4, true),
        ("Hugo", "Lefevre", 5, true),
        ("Lukas", "Becker", 11, true),
        ("Anna", "Muller", 12, true),
        ("Jonas", "Schmidt", 13, true),
        ("Laura", "Wagner", 26, true),
        ("Felix", "Hoffman", 27, true),
        ("Lena", "Fischer", 6, true)
  ;

  UPDATE employee
  SET manager_id = 1
  WHERE role_id = 2 or role_id = 3 or role_id = 10 or role_id = 16
  ;

  UPDATE employee
  SET manager_id = 3
  WHERE role_id = 4 or role_id = 5
  ;

  UPDATE employee
  SET manager_id = 10
  WHERE role_id > 5 and role_id < 10
  ;

  UPDATE employee
  SET manager_id = 16
  WHERE role_id > 10 and role_id < 16
  ;

  UPDATE employee
  SET manager_id = 22
  WHERE role_id > 17 and role_id < 22
  ;

  UPDATE employee
  SET manager_id = 29
  WHERE role_id > 23 and role_id < 29
  ;

  UPDATE employee
  SET manager_id = 17
  WHERE role_id = 22
  ;

  UPDATE employee
  SET manager_id = 23
  WHERE role_id = 29
  ;
   

