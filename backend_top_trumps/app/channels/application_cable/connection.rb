module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # identified_by :current_user
    
    def connect
      
      puts "I'm in connection"
    end
  end
end
