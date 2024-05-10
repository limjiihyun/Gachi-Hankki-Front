import {StyleSheet} from 'react-native';

const StartScreenStyle=StyleSheet.create({
    Container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
    },
    ImageContainer:{
        alignItems:'center'
    },
    MainLogoView:{
        width: 166, 
        height: 134,
        marginBottom:30
    },
    LogoContainer:{
        marginTop:80,
        marginHorizontal:16,
    },
    StartButton:{
        width:'100%',
        height:'17%',
        backgroundColor:'#7D5F3D',
        borderRadius:13,
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop:30
    },
    StartButtonText:{
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:17,
        fontWeight:'500'
  }
})

export default StartScreenStyle;