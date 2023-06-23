nest_dev:
	cd ./backend-nest && npm run start:dev

nest_prod:
	cd ./backend-nest && npm run start:prod

nest_build:
	cd ./backend-nest && npm run build

express_dev:
	cd ./backend-express && npm run start:dev

express_prod:
	cd ./backend-express && npm run start:prod

frontend_dev:
	cd ./frontend && npm run dev

frontend_build:
	cd ./frontend && npm run build

frontend_preview:
	cd ./frontend && npm run preview



frontend_npm:
	cd ./frontend && npm install

express_npm:
	cd ./backend-express && npm install

nest_npm:
	cd ./backend-nest && npm install
