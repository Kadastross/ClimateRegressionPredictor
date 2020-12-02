## Setting up the databases

We are using two databases: one in MySQL, and the other in Neo4j. First create a MySQL database, either locally or remotely. Change the MySQL credentials in initSQL.py, importCO2Data.py, and sqlExecute.py to reflect where your database is. Run initSQL.py, followed by importCO2Data.py. Now create a Neo4j database and input the credentials in sqlExecute.py. Run sqlExecute.py. Your application should now be running on both databases.
