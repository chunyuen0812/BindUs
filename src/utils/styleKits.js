// 設計稿的寬度/ 元素的寬度 = 手機的屏幕/ 手機中元素的寬度
// 手機中元素的寬度 = 手機屏幕 * 元素的寬度 / 設計稿中的寬度

import { Screen } from "react-native-screens";
import { Dimensions,StatusBar} from "react-native";
import { theme } from 'galio-framework';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

/**
 * 像素轉dp
 * @param {Number} elePx 
 * @returns 元素的寬度或高度 單位px
 */
export const pxToDp = (elePx) => screenWidth * elePx / 375;

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));