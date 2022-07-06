# Note

That repository is going to change into 'private repository' after being evaluated my submission

# How to run

docker build -t ftable .

docker run -p 3000:3000 ftable

# [Kuehne+Nagel] Technical task for a frontend developer

Write a solution in JavaScript, using React framework.

[done] 1. The solution should display a table with the following fields "id", "code", "name", "date". The solution should only display 50 records on first load and should not freeze even if there are more than 1000 records (Use lazy loading when scrolling near the bottom of the screen. Loading is carried out for 50 records)

[not completely] (filter does not work properly (could not finish in time)) 2. The solution must provide the ability to filter and sort the data in the table.

[done] 3. The solution must provide the ability to group orders (use checkboxes to group/ungroup them). As the group is formed, it is assigned a "number".

[done] 4. The solution should be able to view the details for each group in a separate page: "group number", "quantity of records", "creation date".

[not completely] (responsivity does not work properly (could not finish in time))
The interface should be responsive and meet UX/UI standards.

All necessary requests to retrieve data from the backend can be mocked.

Optional:
[done]
Write a Docker file to run solution in Docker environment

Create tests(you can use any library)
