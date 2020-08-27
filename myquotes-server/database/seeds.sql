INSERT INTO users (username, email, password) VALUES ('james101', 'james.anderson@mail.com', 'password1');
INSERT INTO users (username, email, password) VALUES ('bob', 'bob.malthus@mail.com', 'password2');
INSERT INTO users (username, email, password) VALUES ('sarah', 'sarah.jackson@mail.com', 'password3');

INSERT INTO authors (name, dob, user_id) VALUES ('Teddy Daniels', '1987-01-22', 1);
INSERT INTO authors (name, dob, user_id) VALUES ('Thomas Sowell', '1946-07-01', 2);
INSERT INTO authors (name, dob, user_id) VALUES ('Thomas Jefferson', '1731-08-19', 2);

INSERT INTO quotes (body, date_of, subject, author_id, user_id)
VALUES ('Is it better to live as a monster or die as a good man', '2010-02-19', 'Mystery, Thriller', 1, 1);
INSERT INTO quotes (body, date_of, subject, author_id, user_id)
VALUES ('It is self-destructive for any society to create a situation where a baby who is born into the world today automatically has pre-existing grievances against another baby born at the same time, because of what their ancestors did centuries ago', '2018-05-11', 'Politics', 2, 1);
INSERT INTO quotes (body, date_of, subject, author_id, user_id)
VALUES ('When you want to help people, you tell them the truth. When you want to help yourself, you tell them what they want to hear.', '2012-08-21', 'Politics', 2, 2);
INSERT INTO quotes (body, date_of, subject, author_id, user_id)
VALUES ('I am a greater believer in luck, and I find the harder I work the more I have of it', '1782-03-02', 'General', 3, 2);
