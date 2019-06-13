class GameChannel < ApplicationCable::Channel    
    def subscribed
        user = User.find_by(id: params[:id])
        puts "I'm subscribed"
        test
        stream_from user
    end

    def test
        def test
            GameChannel.broadcast_to(@user, {message: 'Im broadcasting'})
        end
    end

end