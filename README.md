# 🌱 Harvest

### Getting Started
```
git clone https://github.com/kevinnayar/harvest.git
cd harvest
npm install
```
Copy and update .env
```
cp sample.env .env
```

First time build DB clean
```
npm db:start-rebuild
```

Start client
```
npm client:start
```

Start server
```
npm server:start
```

Going forward, if you have [tmux](https://linuxize.com/post/getting-started-with-tmux/) installed
```
./tmux-dev.sh
```

Otherwise, just run the `client` and the `server`



### Stack
- React
- Redux
- Thunk
- Node
- Express
- Postgres
- Typescript
- React Router
- Jest
- Parcel


### Plant hardiness zones data
* [Data](http://prism.oregonstate.edu/projects/plant_hardiness_zones.php)
* [Maps](https://planthardiness.ars.usda.gov/PHZMWeb/Default.aspx)




