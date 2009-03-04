require "rubygems"
require "sinatra"
require "activesupport"

get '/' do
	redirect "/index.html"
end

get '/get' do
	generate(100).to_json
end

def generate(n=1)
	base = %W(A B C D E I J M P V L R S T W Z)
	strands = []
	n.times { strands << base.map{ |e| [rand, e] }.sort.map(&:last).join('') }
	strands
end

# configure do
#   set :map_jobs, Dir.glob("data/*.txt")
#   set :reduce_jobs, []
#   set :result, nil
# end
#  
# get "/" do
#   redirect "/map/#{options.map_jobs.pop}" unless options.map_jobs.empty?
#   redirect "/reduce"                      unless options.reduce_jobs.empty?
#   redirect "/done"
# end
#  
# get "/map/*"  do erb :map,    :file => params[:splat].first; end
# get "/reduce" do erb :reduce, :data => options.reduce_jobs;  end
# get "/done"   do erb :done,   :answer => options.result;     end
#  
# post "/emit/:phase" do
#   case params[:phase]
#   when "reduce" then
#     options.reduce_jobs.push params['count']
#     redirect "/"
#  
#   when "finalize" then
#     options.result = params['sum']
#     redirect "/done"
#   end
# end
 
# To run the job server: 
# > ruby job-server.rb -p 80 
