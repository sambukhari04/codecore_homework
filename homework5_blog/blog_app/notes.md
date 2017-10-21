RAILS NOTES

Lab 1:  Creating new project
1 Created new dir
2 Go the the new dir
3 Run in terminal ‘rails new amazon_app’ to create new project (no test and pg by default)
4 Go to the new project
5 Run ‘rails s’ to start the server

Lab 2: Build home and about page
Create controller and run: ‘rails g controller home’ for the home page
Got to routes.rb (in config — > routes). Add:
Rails.application.routes.draw do
  Rails.application.routes.draw do

			folder	filename.     path
                            👇.         👇.             👇
get('/home', {to: 'home#home', as: :home })
    get('/about', {to: 'home#about', as: :about})
  end
end



Go to controllers —> concerns —> define the page e.g.

class HomeController < ApplicationController

  def home
  end

  def about
  end

end



Lab 3: Build a contact us page
Go to controllers —> concerns —> define the page (contact us in our case)

Generating model:
rails g model question title:string body:text
Generated in app->models
Also db —> migrate

Creating database:
rails db:create
rails db:migrate (it will add the table we created when generating model)
rails db:rollback (reverting); if I need more than one step, than rails db:rollback STEP=2

Adding new column to questions table
rails g migration add_view_count_to_question view_count:integer
rails g migration change_price_to_Float price:Float
then migrate again (schema will be updated with new column)

Removing column from questions table
rails g migration remove_like_count_from_question like_count:integer

rails c - console
Question.connection
Question
 => Question(id: integer, title: string, body: text, created_at: datetime, updated_at: datetime, view_count: integer)

2.4.1 :004 > q = Question.new
 => #<Question id: nil, title: nil, body: nil, created_at: nil, updated_at: nil, view_count: nil>

2.4.1 :005 > q.title = 'What is your favourite color?'
 => "What is your favourite color?"

2.4.1 :006 > q.body = 'There are many to choose from like pink yellow etc.'
 => "There are many to choose from like pink yellow etc."

2.4.1 :007 > q.persisted? (check if it’s exist)
q.save (save in database)

Add PRY:
Go to GEMFile and add PRY under group :development do —>
	gem 'pry'
  	gem 'pry-rails'

Using PRY type rails c:
Question.connection
q = Question.new title: 'What is your name', body: 'Do you real explanation for this'

q = Question.create title: 'What is love', body: 'Baby I love you' —> automatically add to database

To add smth —> q.body += ‘Adding something’
q.save —> save and update database
Question.all —> select everything from database
Question.find(2) - finding from database by id
Question.find_by(id: 9) - more flexible finding from database by id


Go to seeds.rb(check class example)

Question.where(id: 8).first.title - getting id8 title
Question.where(“id > 80”)
SELECT "questions".* FROM "questions" WHERE (title ILIKE '%meese%')
Question.all.order(created_at: :desc)
Question.where('title ILIKE ?', '%el%').limit(10).order(created_at: :desc)


Validations:
Adding validations to models—>question.rb
reload! - reloading models
q.errors OR q.errors.full_messages - check the error

This is where we set the rules for our db(data)

rails g controller --help
rails g controller questions  new (generate)
rails d controller questions  new (destroy)
rails g controller questions new --no-assets --no-helper (no coffeee and scss file )
rails routes
