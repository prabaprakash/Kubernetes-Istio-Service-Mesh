docker run -it --name=service-1 --network servicetest -e API=service-2 -p 81:80 prabakaran/service-1
docker run -it --name=service-2 --network servicetest -e API=service-3 prabakaran/service-2
docker run -it --name=service-3 --network servicetest -e API=service-4 prabakaran/service-3
docker run -it --name=service-4 --network servicetest -e API=service-5 prabakaran/service-4
docker run -it --name=service-5 --network servicetest -e API=service-6 prabakaran/service-5
docker run -it --name=service-6 --network servicetest -e API=service-7 prabakaran/service-6
docker run -it --name=service-7 --network servicetest -e API=service-8 prabakaran/service-7
docker run -it --name=service-8 --network servicetest -e API=service-9 prabakaran/service-8
docker run -it --name=service-9 --network servicetest -e API=service-10 prabakaran/service-9
docker run -it --name=service-10 --network servicetest prabakaran/service-10