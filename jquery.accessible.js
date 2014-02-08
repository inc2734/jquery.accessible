/**
 * jquery.accessible
 * Description: フォントサイズ変更機能、色反転機能を実装
 * Version: 1.0.0
 * Author: Takashi Kitajima
 * Autho URI: http://2inc.org
 * created : February 8, 2014
 * modified:
 * License: GPL2
 *
 * Copyright 2014 Takashi Kitajima (email : inc@2inc.org)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2, as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */
( function( $ ) {
	$.fn.accessible_fontsize = function( config ) {
		var defaults = {
			base_font_size: 13, // 標準文字サイズ
			normal_btn_id : '#fontsize-normal', // 標準ボタンのID名
			enlarge_btn_id: '#fontsize-enlarge' // 拡大ボタンのID名
		};
		var config = $.extend( defaults, config );

		var saved_font_size = $.cookie( 'fontsize' );
		var now_font_size =  ( saved_font_size ) ? saved_font_size : config.base_font_size;
		$( 'body' ).css( 'fontSize', now_font_size + 'px' );

		var methods = {
			change_body_font_size: function( _fontsize ) {
				$( 'body' ).css( 'fontSize', _fontsize + 'px' );
				$.cookie( 'fontsize', _fontsize, { expires: 1, path: '/' } );
			}
		};

		return this.each( function( i, e ) {
			$( e ).find( config.normal_btn_id ).click( function() {
				now_font_size = config.base_font_size;
				methods.change_body_font_size( now_font_size );
			} );
			$( e ).find( config.enlarge_btn_id ).click( function() {
				now_font_size = parseInt( now_font_size ) + 1;
				methods.change_body_font_size( now_font_size );
			} );
		} );
	};

	$.fn.accessible_inverse = function( config ) {
		var defaults = {
			inverse_class: 'default', // 反転を判別するclass名 ( inverse-default )
			target : '*' // 反転する対象 ( eg: div, a, #contents )
		};
		var config = $.extend( defaults, config );

		var methods = {
			invert_color: function() {
				var is_inverted_color = $.cookie( 'is_inverted_color' );
				if ( is_inverted_color === config.inverse_class ) {
					methods.remove_inverse_class();
					$( config.target ).addClass( 'inverse-' + config.inverse_class );
				}
			},
			remove_inverse_class: function() {
				$( config.target ).removeClass( function ( index, css ) {
					return ( css.match (/\binverse-\S+/g) || [] ).join( ' ' );
				} );
			}
		};

		methods.invert_color();

		return this.each( function( i, e ) {
			$( e ).click( function() {
				var is_inverted_color = $.cookie( 'is_inverted_color' );
				if ( is_inverted_color !== config.inverse_class ) {
					$.cookie( 'is_inverted_color', config.inverse_class, { expires: 1, path: '/' } );
				} else {
					$.cookie( 'is_inverted_color', 'false', { expires: 1, path: '/' } );
					methods.remove_inverse_class();
				}
				methods.invert_color();
			} );
		} );
	};
} )( jQuery );