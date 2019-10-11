for d in */ ;
do
    echo "${d::-1}"
    docker rm -f "${d::-1}"
    echo $PWD
    docker build . --tag "prabakaran/${d::-1}"
    docker login
    docker push "prabakaran/${d::-1}"
    cd ..
done