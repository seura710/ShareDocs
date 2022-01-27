class RegistrationsController < ApplicationController
    before_filter :cors_set_access_control

    def cors_set_access_control
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
        headers['Access-Control-Request-Method'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end
    
    def create
        user = User.create!(
            email: params['user']['email'],
            password: params['user']['password'],
            password_confirmation: params['user']['password_confirmation']
        )
        if user
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
            }
        else 
            render json: { status: 500 }
        end
    end
end