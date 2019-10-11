for d in */ ;
do
    docker rm -f "${d::-1}"
done