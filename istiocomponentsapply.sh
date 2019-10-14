echo $PWD
kubectl delete -f grafanagateway.yaml
kubectl delete -f kialigateway.yaml
kubectl delete -f prometheusgateway.yaml
kubectl delete -f tracinggateway.yaml

kubectl apply -f grafanagateway.yaml
kubectl apply -f kialigateway.yaml
kubectl apply -f prometheusgateway.yaml
kubectl apply -f tracinggateway.yaml
