FROM avatao/controller:ubuntu-16.04

USER root

RUN cd ~ \
	&& curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh \
	&& bash nodesource_setup.sh \
	&& apt-get update \
	&& apt-get install -qy nodejs \
	&& sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
	&& apt-get update \
	&& apt-get install -qy \
		libgconf-2-4 \
		google-chrome-unstable \
		fonts-ipafont-gothic \
		fonts-wqy-zenhei \
		fonts-thai-tlwg \
		fonts-kacst \
		ttf-freefont --no-install-recommends --allow-unauthenticated \
	&& rm -rf /var/lib/apt/lists/* \
	&& cd /opt \
	&& npm i puppeteer \
	&& chmod -R 777 /opt/node_modules/puppeteer/.local-chromium

COPY ./ /

USER user
