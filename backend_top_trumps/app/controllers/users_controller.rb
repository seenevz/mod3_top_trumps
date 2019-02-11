class UsersController < ApplicationController
    before_action :find_user, only: [:show]
    
    def index
        @users = User.all
        render json: @users
    end

    def show
        if @user
            render json: @user
        else
            render json: {error: 'User not found'}, status: 404
        end 
    end

    def create
        @user = User.new(name: params[:name])

        if @user.save
            render json: @user
        else
            render json: {error: 'Unable to create user'}, status: 400
        end
    end

    

    private

    def find_user
        @user = User.find_by(id: params[:id])
    end
end
