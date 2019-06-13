module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :user
    
    def connect
      
      puts "I'm in connection"
    
    end
  end
end
