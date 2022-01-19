docker-compose down -v

cert=`find ../../test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/ -name '*_sk' -printf "%f\n"`

pushd ./connection-profile
json -I -f test-network.json -e "this.organizations.Org1MSP.adminPrivateKey.path='/tmp/crypto/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/${cert}'"
popd

docker-compose up -d