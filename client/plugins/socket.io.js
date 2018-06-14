import io from 'socket.io-client'

const socket = io(process.env.socket_url)

export default socket
