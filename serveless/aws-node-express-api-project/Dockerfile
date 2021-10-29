FROM public.ecr.aws/lambda/nodejs:14
# Alternatively, you can pull the base image from Docker Hub: amazon/aws-lambda-nodejs:12

# Assumes your function is named "app.js", and there is a package.json file in the app directory 
COPY handler.js package.json  ${LAMBDA_TASK_ROOT}

# Install NPM dependencies for function
RUN npm install

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "handler.handler" ]  

# RUN npm install -g serverless
# RUN serverless offline start

# COPY ./entry_script.sh /entry_script.sh
# ADD aws-lambda-rie-arm64 /usr/local/bin/aws-lambda-rie
# RUN sudo
# RUN ["chmod", "+x", "/usr/local/bin/aws-lambda-rie"]
# ENTRYPOINT ["/entry_script.sh"]