#!/bin/bash

session="harvest"

tmux start-server

window_client=$(tmux new-session -d -s $session -n client -PF '#{window_id}')
tmux select-window -t $window_client
tmux send-keys "npm run client:start" C-m

window_server=$(tmux new-window -n server -PF '#{window_id}')
tmux select-window -t $window_server
tmux send-keys "npm run server:start" C-m

window_ids=(${window_client:1} ${window_server:1})

tmux set -t $session
tmux -CC attach-session -t $session
