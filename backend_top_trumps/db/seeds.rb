# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Card.create(name: 'Theresa May', url: 'https://timedotcom.files.wordpress.com/2019/02/theresa-may-brexit.jpg', description: Faker::ChuckNorris.fact, attribute_1: rand(1..100), attribute_2: rand(1..100), attribute_3: rand(1..100), attribute_4: rand(1..100), attribute_5: rand(1..100))
Card.create(name: 'Donald Trump', url: 'https://shawglobalnews.files.wordpress.com/2019/02/20508990.jpg', description: Faker::ChuckNorris.fact, attribute_1: rand(1..100), attribute_2: rand(1..100), attribute_3: rand(1..100), attribute_4: rand(1..100), attribute_5: rand(1..100))
Card.create(name: 'Vladimir Putin', url: 'https://images-na.ssl-images-amazon.com/images/I/61QgIYCeCvL._SX355_.jpg', description: Faker::ChuckNorris.fact, attribute_1: rand(1..100), attribute_2: rand(1..100), attribute_3: rand(1..100), attribute_4: rand(1..100), attribute_5: rand(1..100))
Card.create(name: 'Kim Jong Un', url: 'https://static-news.moneycontrol.com/static-mcnews/2018/01/Kim-Jong-UN_North-Korea-770x433.jpg', description: Faker::ChuckNorris.fact , attribute_1: rand(1..100), attribute_2: rand(1..100), attribute_3: rand(1..100), attribute_4: rand(1..100), attribute_5: rand(1..100))
Card.create(name: 'Marcelo Rebelo de Sousa', url: 'http://portuguese-american-journal.com/wp-content/uploads/2016/03/123PRESIDENT.jpg', description: Faker::ChuckNorris.fact , attribute_1: rand(1..100), attribute_2: rand(1..100), attribute_3: rand(1..100), attribute_4: rand(1..100), attribute_5: rand(1..100))
Card.create(name:  'Claude junker', url: 'https://guengl-panamapapers.eu/wp-content/uploads/2017/01/Jean-Claude-Juncker-012.jpg', description: Faker::ChuckNorris.fact, attribute_1: rand(1..100), attribute_2: rand(1..100), attribute_3: rand(1..100), attribute_4: rand(1..100), attribute_5: rand(1..100))
Card.create(name: 'Justin Trudeau', url: 'https://www.cbc.ca/kidscbc2/content/the_feed/presvspm_trudeau-min.jpg', description: Faker::ChuckNorris.fact, attribute_1: rand(1..100), attribute_2: rand(1..100), attribute_3: rand(1..100), attribute_4: rand(1..100), attribute_5: rand(1..100))
Card.create(name: 'Angela Merkl', url: 'https://timedotcom.files.wordpress.com/2017/11/distracted-angela-merkel-bad-for-world.jpg', description: Faker::ChuckNorris.fact, attribute_1: rand(1..100), attribute_2: rand(1..100), attribute_3: rand(1..100), attribute_4: rand(1..100), attribute_5: rand(1..100))
Card.create(name: 'Muhammad Ubuhari', url: 'http://cs.mg.co.za/crop/content/images/2016/03/03/ipadnigerianpresidentmuhammadubuhari.jpg/800x450/', description: Faker::ChuckNorris.fact, attribute_1: rand(1..100), attribute_2: rand(1..100), attribute_3: rand(1..100), attribute_4: rand(1..100), attribute_5: rand(1..100))
Card.create(name: 'Malcom Turbull', url: 'https://images.reference.com/reference-production-images/question/aq/president-australia_27da094c732dd7f2.jpg', description: Faker::ChuckNorris.fact, attribute_1: rand(1..100), attribute_2: rand(1..100), attribute_3: rand(1..100), attribute_4: rand(1..100), attribute_5: rand(1..100))



User.create(name: 'Kev')
User.create(name: 'Serg')
User.create(name: 'Mani')
User.create(name: 'George')