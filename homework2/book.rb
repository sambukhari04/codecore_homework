# Build a Ruby class called Book. Objects of the Book class must have two attributes: title and chapters. Objects must have two methods: add_chapter and chapters. The add_chapter method adds a chapter by giving it a title. The chapters method should display the number of chapters and lists all the chapters as in:




class Book
  def initialize
    @title = ""
    @chapters = []
    @counter = 1
    puts "Book Start"
  end
  attr_accessor :title, :chapters

  def add_chapter(name)
    @chapters << "#{@counter}. #{name}"
    @counter += 1
    #  return @new_array
  end

  def chapter
    puts "My book: #{@title} #{@chapters.length}"

    chapters.each do |x|
      puts "#{x}"

    end
  end
end
