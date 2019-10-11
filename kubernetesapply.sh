for d in */ ;
do
    echo "${d::-1}"
    cd $d
    echo $PWD
    kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml
    cd ..
done
kubectl apply -f gateway.yaml
kubectl apply -f virtualservice.yaml