for d in */ ;
do
    echo "${d::-1}"
    cd $d
    echo $PWD
    docker build . --tag "prabakaran/${d::-1}"
    docker login
    docker push "prabakaran/${d::-1}"
    cd ..
done