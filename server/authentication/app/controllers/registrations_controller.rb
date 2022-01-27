class RegistrationsController < ApplicationController
    before_filter :cors_preflight_check
  after_filter :cors_set_access_control_headers

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