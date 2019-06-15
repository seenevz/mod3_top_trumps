class GameChannel < ApplicationCable::Channel    
    def subscribed
        # user = User.find_by(id: params[:id])
        puts "I'm subscribed with user game_channel!"

        stream_from 'game_channel'
    end

    def transmit(data)
        puts "from transmit I have #{data['payload']}"

        GameChannel.broadcast_to('game_channel', payload: data['payload'])
    end

    
end