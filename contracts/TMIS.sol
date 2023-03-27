///////////////////////////       \\\\\\\\\            /////////   ||||||||||||||||    ./////////////////////////.   
///////////////////////////       \\\\\\\\\\          //////////   ||||||||||||||||  .///////////////////////////.
///////////////////////////       \\\\\\\\\\\        ///////////   ||||||||||||||||  .///////////////////////////.
///////////////////////////       \\\\\\\\\\\\------////////////   ||||||||||||||||  .//////////////////////////.
         /////////                \\\\\\\\\\\\\----/////////////      ||||||||||      .///////////////
         /////////                \\\\\\\\\\\\\\--//////////////      ||||||||||      .\\\\\\\\\\\\\
         /////////                \\\\\\\\\\\\\\\///////////////      ||||||||||       .\\\\\\\\\\\\\\\\
         ///////// -------------- \\\\\\\\\            /////////      ||||||||||          \\\\\\\\\\\\\\\\\\
         ///////// -------------- \\\\\\\\\            /////////      ||||||||||                 \\\\\\\\\\\\\\\\.
         ///////// -------------- \\\\\\\\\            /////////      ||||||||||                  \\\\\\\\\\\\\\\\.
         ///////// -------------- \\\\\\\\\            /////////      ||||||||||                  ||||||||||||||||.
         /////////                \\\\\\\\\            /////////      ||||||||||                  ////////////////.
         /////////                \\\\\\\\\            /////////      ||||||||||               ///////////////////.
         /////////                \\\\\\\\\            /////////   ||||||||||||||||   `///////////////////////////.
         /////////                \\\\\\\\\            /////////   ||||||||||||||||  `////////////////////////////.
         /////////                \\\\\\\\\            /////////   ||||||||||||||||  `////////////////////////////.
         /////////                \\\\\\\\\            /////////   ||||||||||||||||  `//////////////////////////. 

// Contact creator: albertog1meza@gmail.com                            POLYGON
// SPDX-License-Identifier: BSL-1.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TMIS {
    constructor () {
        creador = msg.sender;
    }
    uint8 private SePuedeCrear = 0;
    address private creador;
    mapping(address => address) private BuscarContratoDelDesarrollador;
    modifier onlyOwner(address direccion) {
        require(direccion == creador, "No creaste T-MIS");
        _;
    }

    function crearContrato(string memory terminosYcondiciones, uint256 DyOchoDinero, uint256 SIXdinero, uint256 rendimiento) public {
        assert(SePuedeCrear == 0);
        address DireccionContratoDelDesarrollador = address(new ContratoDelDesarrollador(msg.sender, terminosYcondiciones, DyOchoDinero, SIXdinero, rendimiento, creador));
        BuscarContratoDelDesarrollador[msg.sender] = DireccionContratoDelDesarrollador;
    }

    function buscarCONTRATO(address _address) public view returns(address) {
        return BuscarContratoDelDesarrollador[_address];
    } 

    function detener() public onlyOwner(msg.sender) {
        SePuedeCrear = 1;
    }

}

contract ContratoDelDesarrollador {

    constructor (address _miDireccion, string memory _lawpaper , uint256 DyOchoDinero, uint256 SIXdinero, uint256 _rendimiento, address creator) {
        addressDelDesarrollador = _miDireccion;
        terminosDELdesarrollador = _lawpaper;
        cantidadObjetivoDyO = DyOchoDinero;
        cantidadObjetivoSIX = SIXdinero;
        rendimiento = _rendimiento;
        creadorTmis = creator;
    } 

    IPermit2 immutable PERMIT2 = IPermit2(address(0x000000000022D473030F116dDEE9F6B43aC78BA3));
    IERC20 immutable USDT = IERC20(address(0xc2132D05D31c914a87C6611C10748AEb04B58e8F));        
    IERC20 immutable USDC = IERC20(address(0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174));
    IERC20 immutable BUSD = IERC20(address(0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7));
    IERC20 immutable DAI = IERC20(address(0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063));
    event ElDesarrolladorYaSacoElDinero(address, address, uint256, uint256, string);
    event ElDesarrolladorYaDevolvioElDinero(address, uint256, string);
    event nadieInvirtioCon(string);
    address public immutable addressDelDesarrollador;
    address private immutable creadorTmis;
    uint256 public immutable cantidadObjetivoSIX;
    uint256 public immutable cantidadObjetivoDyO;
    uint256 public immutable rendimiento;
    string private terminosDELdesarrollador;
    mapping(address => uint256) private MAP_six_inversionista;
    mapping(address => uint256) private MAP_DyOcho_inversionista;
    mapping(address => bool) private MAP_DyOcho_yaSacoSuRendimiento;
    mapping(address => bool) private MAP_six_yaSacoSuRendimiento;
    uint256 private totalRecaudado_six;
    uint256 private totalRecaudado_DyOcho;
    uint256 private T_masTres_M;
    uint8 private returnWhith = 0;
    uint8 private NoProfit = 0;
    bool private yaSacoElDinero = false; 
    bool public yaLiquido = false; 
    bool public seRealizoElProyecto = true;

    modifier onlyOwner(address _direccion) {
        require(_direccion == addressDelDesarrollador, "No tienes permiso para generar esta function");
        _;
    }
    modifier OnlyInvestors(address direccion) {
        assert(yaLiquido == true);
        require(MAP_DyOcho_yaSacoSuRendimiento[direccion] == false && MAP_six_yaSacoSuRendimiento[direccion] == false, "Ya sacaste tu rendimiento");
        _;
    }
    modifier requisitos(address _direccion) {
        require(_direccion != addressDelDesarrollador);
        assert(yaSacoElDinero == false);
        _;
    }
    function sixComision(uint256 _cantidad) private pure returns(uint256 invertido) {
        require(_cantidad > 2000000, "Tienes que mandar mas de 2 tokens");
        invertido = SafeMath.sub(_cantidad, 2000000); 
    }
    function DyOchoComision(uint256 _cantidad) private pure returns(uint256 invertido) {
        require(_cantidad > 2000000000000000000, "Tienes que mandar mas de 2 tokens");
        invertido = SafeMath.sub(_cantidad, 2000000000000000000); 
    }
    function CalcularRendimiento(uint256 _cantidad) private view returns(uint256) {
        uint256 multiplication = SafeMath.mul(_cantidad, rendimiento);
        uint256 division = SafeMath.div(multiplication, 100);
        return SafeMath.add(division, _cantidad);
    }

    function transferSix() private {
        if(USDC.balanceOf(address(this)) == 0 && USDT.balanceOf(address(this)) == 0) {
            emit nadieInvirtioCon("USDC y USDT");
        } else if (USDC.balanceOf(address(this)) == 0) {
            USDT.transfer(addressDelDesarrollador, USDT.balanceOf(address(this)));
        } else {
            USDC.transfer(addressDelDesarrollador, USDC.balanceOf(address(this)));
            USDT.transfer(addressDelDesarrollador, USDT.balanceOf(address(this)));
        }
    }

    function sixNOTwin() private {
        if(USDC.balanceOf(address(this)) == 0) {
            USDT.transfer(msg.sender, MAP_six_inversionista[msg.sender]);
        } else {
            USDC.transfer(msg.sender, MAP_six_inversionista[msg.sender]);
        }
        MAP_six_yaSacoSuRendimiento[msg.sender] = true;
    }

    function sixWithdraw() private {
        if(USDC.balanceOf(address(this)) == 0) {
            USDT.transfer(msg.sender, verCuantoTeGanarasSix());
        } else {
            USDC.transfer(msg.sender, verCuantoTeGanarasSix());
        }
        MAP_six_yaSacoSuRendimiento[msg.sender] = true;
    }

    function DyOchoNOTwin() private {
        if(BUSD.balanceOf(address(this)) == 0) {
            DAI.transfer(msg.sender, MAP_DyOcho_inversionista[msg.sender]);
        } else {
            BUSD.transfer(msg.sender, MAP_DyOcho_inversionista[msg.sender]);
        }
        MAP_DyOcho_yaSacoSuRendimiento[msg.sender] = true;
    }

    function DyOchoWithdraw() private {
        if(BUSD.balanceOf(address(this)) == 0) {
            DAI.transfer(msg.sender, verCuantoTeGanarasDyOcho());
        } else {
            BUSD.transfer(msg.sender, verCuantoTeGanarasDyOcho());
        }
        MAP_DyOcho_yaSacoSuRendimiento[msg.sender] = true;
    }

    function DyOchotransfer() private {
        if(BUSD.balanceOf(address(this)) == 0 && DAI.balanceOf(address(this)) == 0) {
            emit nadieInvirtioCon("DAI y BUSD");
        } else if (BUSD.balanceOf(address(this)) == 0) {
            DAI.transfer(addressDelDesarrollador, DAI.balanceOf(address(this)));
        } else {
            BUSD.transfer(addressDelDesarrollador, BUSD.balanceOf(address(this)));
            DAI.transfer(addressDelDesarrollador, DAI.balanceOf(address(this)));
        }
    }

    function Invest(IERC20 token, uint256 amount, uint256 nonce, uint256 deadline, bytes calldata signature) public requisitos(msg.sender) {
        if(token == USDC || token == USDT) {
            uint256 invertido = sixComision(amount);
            require(sixContractBalance() + invertido <= cantidadObjetivoSIX, "Tu cantidad sobrepasa lo esperado");
            PERMIT2.permitTransferFrom(
                IPermit2.PermitTransferFrom(IPermit2.TokenPermissions(token, amount), nonce, deadline),
                IPermit2.SignatureTransferDetails({to: address(this), requestedAmount: amount}),
                msg.sender,
                signature
            );
            token.transfer(creadorTmis, 2000000);
            MAP_six_inversionista[msg.sender] += invertido;
        } else if(token == DAI || token == BUSD) {
            uint256 invertido = DyOchoComision(amount);
            require(DyOchoContractBalance() + invertido <= cantidadObjetivoDyO, "Tu cantidad sobrepasa lo esperado");
            PERMIT2.permitTransferFrom(
                IPermit2.PermitTransferFrom(IPermit2.TokenPermissions(token, amount), nonce, deadline),
                IPermit2.SignatureTransferDetails({to: address(this), requestedAmount: amount}),
                msg.sender,
                signature
            );
            token.transfer(creadorTmis, 2000000000000000000);
            MAP_DyOcho_inversionista[msg.sender] += invertido;
        }
    }

    function withdrawForOwner() public onlyOwner(msg.sender) {
        assert(yaSacoElDinero == false);
        T_masTres_M = block.timestamp + 7889229;
        totalRecaudado_six = sixContractBalance();
        totalRecaudado_DyOcho = DyOchoContractBalance();
        DyOchotransfer();
        transferSix();
        yaSacoElDinero = true;
        emit ElDesarrolladorYaSacoElDinero(addressDelDesarrollador, address(this), totalRecaudado_six, totalRecaudado_DyOcho, "Ya nadie puede invertir");
    }

    function devolverCantidadSix(IERC20 token, uint256 amount, uint256 nonce, uint256 deadline, bytes calldata signature) public onlyOwner(msg.sender) {
        require(token == USDC || token == USDT, "Esta address no es USDT ni USDC");      
        require(amount == CalcularRendimiento(totalRecaudado_six), "Esta cantidad no es suficiente para liquidar a todos tus inversionistas");
        assert(NoProfit == 0);
        PERMIT2.permitTransferFrom(
            IPermit2.PermitTransferFrom(IPermit2.TokenPermissions(token, amount), nonce, deadline),
            IPermit2.SignatureTransferDetails({to: address(this), requestedAmount: amount}),
            msg.sender,
            signature
        );
        returnWhith = 1;
        yaLiquido = true;
        emit ElDesarrolladorYaDevolvioElDinero(addressDelDesarrollador, sixContractBalance(), "Ya pueden los que invirtieron en USDT y USDC sacar sus rendimientos");
    }

    function devolverCantidadDyOcho(IERC20 token, uint256 amount, uint256 nonce, uint256 deadline, bytes calldata signature) public onlyOwner(msg.sender) {
        require(token == DAI || token == BUSD, "Esta address no es DAI ni BUSD");      
        require(amount == CalcularRendimiento(totalRecaudado_DyOcho), "Esta cantidad no es suficiente para liquidar a todos tus inversionistas");
        assert(NoProfit == 0);
        PERMIT2.permitTransferFrom(
            IPermit2.PermitTransferFrom(IPermit2.TokenPermissions(token, amount), nonce, deadline),
            IPermit2.SignatureTransferDetails({to: address(this), requestedAmount: amount}),
            msg.sender,
            signature
        );
        returnWhith = 1;
        yaLiquido = true;
        emit ElDesarrolladorYaDevolvioElDinero(addressDelDesarrollador, DyOchoContractBalance(), "Ya pueden los que invirtieron en DAI y BUSD sacar sus rendimientos");
    }

    function DevolverPorContratiempoSix(IERC20 token, uint256 amount, uint256 nonce, uint256 deadline, bytes calldata signature) public onlyOwner(msg.sender) {
        assert(returnWhith == 0);
        require(T_masTres_M > block.timestamp, "Ya pasaron los 3 meses");
        require(amount == totalRecaudado_six, "Esto no es lo que recaudaste");
        require(token == USDC || token == USDT, "Esta address no es USDT ni USDC");
        PERMIT2.permitTransferFrom(
            IPermit2.PermitTransferFrom(IPermit2.TokenPermissions(token, amount), nonce, deadline),
            IPermit2.SignatureTransferDetails({to: address(this), requestedAmount: amount}),
            msg.sender,
            signature
        );
        seRealizoElProyecto = false;
        yaLiquido = true;
        NoProfit = 1;
    }

    function DevolverPorContratiempoDyOcho(IERC20 token, uint256 amount, uint256 nonce, uint256 deadline, bytes calldata signature) public onlyOwner(msg.sender) {
        assert(returnWhith == 0);
        require(T_masTres_M > block.timestamp, "Ya pasaron los 3 meses");
        require(amount == totalRecaudado_DyOcho, "Esto no es lo que recaudaste");
        require(token == DAI || token == BUSD, "Esta address no es DAI ni BUSD");
        PERMIT2.permitTransferFrom(
            IPermit2.PermitTransferFrom(IPermit2.TokenPermissions(token, amount), nonce, deadline),
            IPermit2.SignatureTransferDetails({to: address(this), requestedAmount: amount}),
            msg.sender,
            signature
        );
        seRealizoElProyecto = false;
        yaLiquido = true;
        NoProfit = 1;
    }

    function withdrawForinvestors() public OnlyInvestors(msg.sender) {
        assert(seRealizoElProyecto == true);
        if(MAP_DyOcho_inversionista[msg.sender] == 0) {
            sixWithdraw();
        } else if (MAP_six_inversionista[msg.sender] == 0) {
            DyOchoWithdraw();
        } else {
            sixWithdraw();
            DyOchoWithdraw();
        }
    }

    function withdrawInvestorsNotWin() public OnlyInvestors(msg.sender) {
        assert(seRealizoElProyecto == false);
        if(MAP_DyOcho_inversionista[msg.sender] == 0) {
            sixNOTwin();
        } else if (MAP_six_inversionista[msg.sender] == 0) {
            DyOchoNOTwin();
        } else {
            sixNOTwin();
            DyOchoNOTwin();
        }
    }

    function sixContractBalance() public view returns(uint256) {        
        uint256 Usdc = USDC.balanceOf(address(this));
        uint256 Tether = USDT.balanceOf(address(this));
        return SafeMath.add(Tether, Usdc);
    }

    function DyOchoContractBalance() public view returns(uint256) {                        
        uint256 Dai = DAI.balanceOf(address(this));
        uint256 Busd = BUSD.balanceOf(address(this));
        return SafeMath.add(Dai, Busd);
    }

    function YaSacoElDinero() public view returns(bool) {                                 
        return yaSacoElDinero;
    }

    function verCuantoTeGanarasSix() public view returns(uint256) {                             
        return CalcularRendimiento(MAP_six_inversionista[msg.sender]);
    }

    function verCuantoDevolverasSix() public view returns(uint256) {                             
        return CalcularRendimiento(totalRecaudado_six);
    }

    function verCuantoDevolverasDyOcho() public view returns(uint256) {                             
        return CalcularRendimiento(totalRecaudado_DyOcho);
    }

    function verCuantoTeGanarasDyOcho() public view returns(uint256) {                              
        return CalcularRendimiento(MAP_DyOcho_inversionista[msg.sender]);
    }

    function SIXverCuantoInvertiste() public view returns(uint256) {                             
        return MAP_six_inversionista[msg.sender];
    }

    function DyOchoverCuantoInvertiste() public view returns(uint256) {                             
        return MAP_DyOcho_inversionista[msg.sender];
    }

    function YaSacasteTuRendimientoSix() public view returns(bool) {                          
        return MAP_six_yaSacoSuRendimiento[msg.sender];
    }

    function YaSacasteTuRendimientoDyOcho() public view returns(bool) {                          
        return MAP_DyOcho_yaSacoSuRendimiento[msg.sender];
    }  

    function verTerminosYcondiciones() public view returns(string memory) {                  
        return terminosDELdesarrollador;
    } 

}

interface IERC20 {
    function transfer(address to, uint256 amount) external returns(bool);
    function balanceOf(address account) external view returns(uint256);
}

interface IPermit2 {
    struct TokenPermissions {
        IERC20 token;
        uint256 amount;
    }
    struct PermitTransferFrom {
        TokenPermissions permitted;
        uint256 nonce;
        uint256 deadline;
    }
    struct SignatureTransferDetails {
        address to;
        uint256 requestedAmount;
    }
    function permitTransferFrom(
        PermitTransferFrom calldata permit, 
        SignatureTransferDetails calldata transferDetails,
        address owner, 
        bytes calldata signature) external;
}