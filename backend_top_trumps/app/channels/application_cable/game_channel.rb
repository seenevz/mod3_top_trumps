class GameChannel < ApplicationCable::Channel    
    def subscribed
        stream_from user
    end

    def user
        puts "Im in the channel"
        User.find_by(id: params[:id])
    end
end