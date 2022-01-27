class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    skip_before_filter  :verify_authenticity_token, only:[:index]
    before_filter :set_headers, only:[:index]
    # http://www.tsheffler.com/blog/2011/02/22/cross-origin-resource-sharing-for-json-and-rails/
    # For all responses in this controller, return the CORS access control headers.
  
    def cors_set_access_control_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
      headers['Access-Control-Max-Age'] = "1728000"
    end
  
    # If this is a preflight OPTIONS request, then short-circuit the
    # request, return only the necessary headers and return an empty
    # text/plain.
    def cors_preflight_check
      if request.method == :options
        puts "cors_preflight_check"
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version'
        headers['Access-Control-Max-Age'] = '1728000'
        render :text => '', :content_type => 'text/plain'
      end
    end
  
  
    #http://stackoverflow.com/questions/19772852/sending-an-angular-post-request-with-parameter-to-rails-api
    def index
      puts "Do nothing."
      render nothing: true
    end
  
    def set_headers
      if request.headers["HTTP_ORIGIN"]
        puts 'ApplicationController.set_headers'
        # better way check origin
        # if request.headers["HTTP_ORIGIN"] && /^https?:\/\/(.*)\.some\.site\.com$/i.match(request.headers["HTTP_ORIGIN"])
        headers['Access-Control-Allow-Origin'] = request.headers["HTTP_ORIGIN"]
        headers['Access-Control-Expose-Headers'] = 'ETag'
        headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
        headers['Access-Control-Allow-Headers'] = '*,x-requested-with,Content-Type,If-Modified-Since,If-None-Match,Auth-User-Token'
        headers['Access-Control-Max-Age'] = '86400'
        headers['Access-Control-Allow-Credentials'] = 'true'
      end
    end
end
