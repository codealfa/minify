function validateForm_8(form) {
        var errorArray = new Array();
        clearErrors_8();
        var h93e8 = document.getElementById('h93e8_1207');
        var h93e8_label = document.getElementById('h93e8_1207_label');
        var h93e8_error = document.getElementById('h93e8_1207_error');
        if (h93e8.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: h93e8, msg: 'error'});
                        h93e8.className = 'input-error jftextbox';
                        h93e8_label.className = 'label-error jftextbox';
                        h93e8_error.innerHTML = 'Field Required';
                }
        } else if (h93e8.value.length > 50) {
                errorArray.push({id: h93e8, msg: 'error'});
                h93e8.className = 'input-error jftextbox';
                h93e8_label.className = 'label-error jftextbox';
                h93e8_error.innerHTML = 'Too long';
        } else {
                var regEx = /^[a-zA-Z0-9_-]+$/
                if (!regEx.test(h93e8.value)) {
                        errorArray.push({id: h93e8, msg: 'error'})
                        h93e8.className = 'input-error jftextbox';
                        h93e8_label.className = 'label-error jftextbox';
                        h93e8_error.innerHTML = 'Invalid format';
                }
        }
        var hb377 = document.getElementById('hb377_1208');
        var hb377_label = document.getElementById('hb377_1208_label');
        var hb377_error = document.getElementById('hb377_1208_error');
        if (hb377.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: hb377, msg: 'error'});
                        hb377.className = 'input-error jftextbox';
                        hb377_label.className = 'label-error jftextbox';
                        hb377_error.innerHTML = 'Field Required';
                }
        } else if (hb377.value.length > 50) {
                errorArray.push({id: hb377, msg: 'error'});
                hb377.className = 'input-error jftextbox';
                hb377_label.className = 'label-error jftextbox';
                hb377_error.innerHTML = 'Too long';
        } else {
                var regEx = /^[a-zA-Z0-9_-]+$/
                if (!regEx.test(hb377.value)) {
                        errorArray.push({id: hb377, msg: 'error'})
                        hb377.className = 'input-error jftextbox';
                        hb377_label.className = 'label-error jftextbox';
                        hb377_error.innerHTML = 'Invalid format';
                }
        }
        var hded7 = document.getElementById('hded7_1209');
        var hded7_label = document.getElementById('hded7_1209_label');
        var hded7_error = document.getElementById('hded7_1209_error');
        if (hded7.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: hded7, msg: 'error'});
                        hded7.className = 'input-error jftextbox';
                        hded7_label.className = 'label-error jftextbox';
                        hded7_error.innerHTML = 'Field Required';
                }
        } else if (hded7.value.length > 50) {
                errorArray.push({id: hded7, msg: 'error'});
                hded7.className = 'input-error jftextbox';
                hded7_label.className = 'label-error jftextbox';
                hded7_error.innerHTML = 'Too long';
        } else {
                var regEx = /^[-.\w]+\@[-.\w]+$/
                if (!regEx.test(hded7.value)) {
                        errorArray.push({id: hded7, msg: 'error'})
                        hded7.className = 'input-error jftextbox';
                        hded7_label.className = 'label-error jftextbox';
                        hded7_error.innerHTML = 'Invalid format';
                }
        }
        var h8f10 = document.getElementById('h8f10_1210');
        var h8f10_label = document.getElementById('h8f10_1210_label');
        var h8f10_error = document.getElementById('h8f10_1210_error');
        if (h8f10.value.length == 0) {
                var required = false;
                if (required) {
                        errorArray.push({id: h8f10, msg: 'error'});
                        h8f10.className = 'input-error jftextbox';
                        h8f10_label.className = 'label-error jftextbox';
                        h8f10_error.innerHTML = 'Field Required';
                }
        } else if (h8f10.value.length > 50) {
                errorArray.push({id: h8f10, msg: 'error'});
                h8f10.className = 'input-error jftextbox';
                h8f10_label.className = 'label-error jftextbox';
                h8f10_error.innerHTML = 'Too long';
        } else {
                var regEx = /^[0-9]+$/
                if (!regEx.test(h8f10.value)) {
                        errorArray.push({id: h8f10, msg: 'error'})
                        h8f10.className = 'input-error jftextbox';
                        h8f10_label.className = 'label-error jftextbox';
                        h8f10_error.innerHTML = 'Invalid format';
                }
        }
        var h903a = document.getElementById('h903a_1213');
        var h903a_label = document.getElementById('h903a_1213_label');
        var h903a_error = document.getElementById('h903a_1213_error');
        if (h903a.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: h903a, msg: 'error'});
                        h903a.className = 'input-error jftextbox';
                        h903a_label.className = 'label-error jftextbox';
                        h903a_error.innerHTML = 'Field Required';
                }
        } else if (h903a.value.length > 10) {
                errorArray.push({id: h903a, msg: 'error'});
                h903a.className = 'input-error jftextbox';
                h903a_label.className = 'label-error jftextbox';
                h903a_error.innerHTML = 'Too long';
        } else {
        }
        var h5799 = document.getElementById('h5799_1214');
        var h5799_label = document.getElementById('h5799_1214_label');
        var h5799_error = document.getElementById('h5799_1214_error');
        var required = true;
        if (required) {
                if (h5799.multiple) {
                        if (h5799.selectedIndex == -1) {
                                errorArray.push({id: h5799, msg: 'error'});
                                h5799.className = 'input-error jflist';
                                h5799_label.className = 'label-error jflist';
                                h5799_error.innerHTML = 'Field Required';
                        }
                } else {
                        if (h5799.selectedIndex == 0) {
                                errorArray.push({id: h5799, msg: 'error'});
                                h5799.className = 'input-error jflist';
                                h5799_label.className = 'label-error jflist';
                                h5799_error.innerHTML = 'Field Required';
                        }
                }
        }
        var hca35 = document.getElementById('hca35_1215');
        var hca35_label = document.getElementById('hca35_1215_label');
        var hca35_error = document.getElementById('hca35_1215_error');
        if (hca35.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: hca35, msg: 'error'});
                        hca35.className = 'input-error jftextbox';
                        hca35_label.className = 'label-error jftextbox';
                        hca35_error.innerHTML = 'Field Required';
                }
        } else if (hca35.value.length > 3) {
                errorArray.push({id: hca35, msg: 'error'});
                hca35.className = 'input-error jftextbox';
                hca35_label.className = 'label-error jftextbox';
                hca35_error.innerHTML = 'Too long';
        } else {
                var regEx = /^[0-9]+$/
                if (!regEx.test(hca35.value)) {
                        errorArray.push({id: hca35, msg: 'error'})
                        hca35.className = 'input-error jftextbox';
                        hca35_label.className = 'label-error jftextbox';
                        hca35_error.innerHTML = 'Invalid format';
                }
        }
        var h5b2d = document.getElementById('h5b2d_1216');
        var h5b2d_label = document.getElementById('h5b2d_1216_label');
        var h5b2d_error = document.getElementById('h5b2d_1216_error');
        var required = true;
        if (required) {
                if (h5b2d.multiple) {
                        if (h5b2d.selectedIndex == -1) {
                                errorArray.push({id: h5b2d, msg: 'error'});
                                h5b2d.className = 'input-error jflist';
                                h5b2d_label.className = 'label-error jflist';
                                h5b2d_error.innerHTML = 'Field Required';
                        }
                } else {
                        if (h5b2d.selectedIndex == 0) {
                                errorArray.push({id: h5b2d, msg: 'error'});
                                h5b2d.className = 'input-error jflist';
                                h5b2d_label.className = 'label-error jflist';
                                h5b2d_error.innerHTML = 'Field Required';
                        }
                }
        }
        var h51d1 = document.getElementById('h51d1_1217');
        var h51d1_label = document.getElementById('h51d1_1217_label');
        var h51d1_error = document.getElementById('h51d1_1217_error');
        var required = true;
        if (required) {
                if (h51d1.multiple) {
                        if (h51d1.selectedIndex == -1) {
                                errorArray.push({id: h51d1, msg: 'error'});
                                h51d1.className = 'input-error jflist';
                                h51d1_label.className = 'label-error jflist';
                                h51d1_error.innerHTML = 'Field Required';
                        }
                } else {
                        if (h51d1.selectedIndex == 0) {
                                errorArray.push({id: h51d1, msg: 'error'});
                                h51d1.className = 'input-error jflist';
                                h51d1_label.className = 'label-error jflist';
                                h51d1_error.innerHTML = 'Field Required';
                        }
                }
        }
        var h694c = document.getElementById('h694c_1218');
        var h694c_label = document.getElementById('h694c_1218_label');
        var h694c_error = document.getElementById('h694c_1218_error');
        if (h694c.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: h694c, msg: 'error'});
                        h694c.className = 'input-error jftextbox';
                        h694c_label.className = 'label-error jftextbox';
                        h694c_error.innerHTML = 'Field Required';
                }
        } else if (h694c.value.length > 50) {
                errorArray.push({id: h694c, msg: 'error'});
                h694c.className = 'input-error jftextbox';
                h694c_label.className = 'label-error jftextbox';
                h694c_error.innerHTML = 'Too long';
        } else {
        }
        var hef42 = document.getElementById('hef42_1219');
        var hef42_label = document.getElementById('hef42_1219_label');
        var hef42_error = document.getElementById('hef42_1219_error');
        if (hef42.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: hef42, msg: 'error'});
                        hef42.className = 'input-error jftextbox';
                        hef42_label.className = 'label-error jftextbox';
                        hef42_error.innerHTML = 'Field Required';
                }
        } else if (hef42.value.length > 50) {
                errorArray.push({id: hef42, msg: 'error'});
                hef42.className = 'input-error jftextbox';
                hef42_label.className = 'label-error jftextbox';
                hef42_error.innerHTML = 'Too long';
        } else {
        }
        var h4493 = document.getElementById('h4493_1220');
        var h4493_error = document.getElementById('h4493_1220_error');
        var h4493_label = document.getElementById('h4493_1220_label');
        if (h4493.value.length == 0) {
                var required = false;
                if (required) {
                        errorArray.push({id: h4493, msg: 'error'})
                        h4493.className = 'input-error jftextarea';
                        h4493_label.className = 'label-error jftextarea';
                        h4493_error.innerHTML = 'Field Required';
                }
        } else {
                if (h4493.value.length > 500) {
                        errorArray.push({id: h4493, msg: 'error'})
                        h4493.className = 'input-error jftextarea';
                        h4493_label.className = 'label-error jftextarea';
                        h4493_error.innerHTML = 'Too long';
                }
                if (h4493.value.length < 10) {
                        errorArray.push({id: h4493, msg: 'error'})
                        h4493.className = 'input-error jftextarea';
                        h4493_label.className = 'label-error jftextarea';
                        h4493_error.innerHTML = 'Too short';
                }
        }
        var h2bd4 = document.getElementById('h2bd4_1222');
        var h2bd4_label = document.getElementById('h2bd4_1222_label');
        var h2bd4_error = document.getElementById('h2bd4_1222_error');
        if (h2bd4.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: h2bd4, msg: 'error'});
                        h2bd4.className = 'input-error jftextbox';
                        h2bd4_label.className = 'label-error jftextbox';
                        h2bd4_error.innerHTML = 'Field Required';
                }
        } else if (h2bd4.value.length > 50) {
                errorArray.push({id: h2bd4, msg: 'error'});
                h2bd4.className = 'input-error jftextbox';
                h2bd4_label.className = 'label-error jftextbox';
                h2bd4_error.innerHTML = 'Too long';
        } else {
                var regEx = /^[a-zA-Z0-9_-]+$/
                if (!regEx.test(h2bd4.value)) {
                        errorArray.push({id: h2bd4, msg: 'error'})
                        h2bd4.className = 'input-error jftextbox';
                        h2bd4_label.className = 'label-error jftextbox';
                        h2bd4_error.innerHTML = 'Invalid format';
                }
        }
        var hd6fe = document.getElementById('hd6fe_1223');
        var hd6fe_label = document.getElementById('hd6fe_1223_label');
        var hd6fe_error = document.getElementById('hd6fe_1223_error');
        var required = true;
        if (required) {
                if (hd6fe.multiple) {
                        if (hd6fe.selectedIndex == -1) {
                                errorArray.push({id: hd6fe, msg: 'error'});
                                hd6fe.className = 'input-error jflist';
                                hd6fe_label.className = 'label-error jflist';
                                hd6fe_error.innerHTML = 'Field Required';
                        }
                } else {
                        if (hd6fe.selectedIndex == 0) {
                                errorArray.push({id: hd6fe, msg: 'error'});
                                hd6fe.className = 'input-error jflist';
                                hd6fe_label.className = 'label-error jflist';
                                hd6fe_error.innerHTML = 'Field Required';
                        }
                }
        }
        var h010c = document.getElementById('h010c_1224');
        var h010c_label = document.getElementById('h010c_1224_label');
        var h010c_error = document.getElementById('h010c_1224_error');
        if (h010c.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: h010c, msg: 'error'});
                        h010c.className = 'input-error jftextbox';
                        h010c_label.className = 'label-error jftextbox';
                        h010c_error.innerHTML = 'Field Required';
                }
        } else if (h010c.value.length > 50) {
                errorArray.push({id: h010c, msg: 'error'});
                h010c.className = 'input-error jftextbox';
                h010c_label.className = 'label-error jftextbox';
                h010c_error.innerHTML = 'Too long';
        } else {
                var regEx = /^[0-9]+$/
                if (!regEx.test(h010c.value)) {
                        errorArray.push({id: h010c, msg: 'error'})
                        h010c.className = 'input-error jftextbox';
                        h010c_label.className = 'label-error jftextbox';
                        h010c_error.innerHTML = 'Invalid format';
                }
        }
        var he156 = document.getElementById('he156_1225');
        var he156_label = document.getElementById('he156_1225_label');
        var he156_error = document.getElementById('he156_1225_error');
        if (he156.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: he156, msg: 'error'});
                        he156.className = 'input-error jftextbox';
                        he156_label.className = 'label-error jftextbox';
                        he156_error.innerHTML = 'Field Required';
                }
        } else if (he156.value.length > 4) {
                errorArray.push({id: he156, msg: 'error'});
                he156.className = 'input-error jftextbox';
                he156_label.className = 'label-error jftextbox';
                he156_error.innerHTML = 'Too long';
        } else {
                var regEx = /^[0-9]+$/
                if (!regEx.test(he156.value)) {
                        errorArray.push({id: he156, msg: 'error'})
                        he156.className = 'input-error jftextbox';
                        he156_label.className = 'label-error jftextbox';
                        he156_error.innerHTML = 'Invalid format';
                }
        }
        var ha78b = document.getElementById('ha78b_1226');
        var ha78b_label = document.getElementById('ha78b_1226_label');
        var ha78b_error = document.getElementById('ha78b_1226_error');
        var required = true;
        if (required) {
                if (ha78b.multiple) {
                        if (ha78b.selectedIndex == -1) {
                                errorArray.push({id: ha78b, msg: 'error'});
                                ha78b.className = 'input-error jflist';
                                ha78b_label.className = 'label-error jflist';
                                ha78b_error.innerHTML = 'Field Required';
                        }
                } else {
                        if (ha78b.selectedIndex == 0) {
                                errorArray.push({id: ha78b, msg: 'error'});
                                ha78b.className = 'input-error jflist';
                                ha78b_label.className = 'label-error jflist';
                                ha78b_error.innerHTML = 'Field Required';
                        }
                }
        }
        var hde9e = document.getElementById('hde9e_1227');
        var hde9e_label = document.getElementById('hde9e_1227_label');
        var hde9e_error = document.getElementById('hde9e_1227_error');
        var required = true;
        if (required) {
                if (hde9e.multiple) {
                        if (hde9e.selectedIndex == -1) {
                                errorArray.push({id: hde9e, msg: 'error'});
                                hde9e.className = 'input-error jflist';
                                hde9e_label.className = 'label-error jflist';
                                hde9e_error.innerHTML = 'Field Required';
                        }
                } else {
                        if (hde9e.selectedIndex == 0) {
                                errorArray.push({id: hde9e, msg: 'error'});
                                hde9e.className = 'input-error jflist';
                                hde9e_label.className = 'label-error jflist';
                                hde9e_error.innerHTML = 'Field Required';
                        }
                }
        }
        var h7292 = document.getElementById('h7292_1228');
        var h7292_label = document.getElementById('h7292_1228_label');
        var h7292_error = document.getElementById('h7292_1228_error');
        if (h7292.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: h7292, msg: 'error'});
                        h7292.className = 'input-error jftextbox';
                        h7292_label.className = 'label-error jftextbox';
                        h7292_error.innerHTML = 'Field Required';
                }
        } else if (h7292.value.length > 50) {
                errorArray.push({id: h7292, msg: 'error'});
                h7292.className = 'input-error jftextbox';
                h7292_label.className = 'label-error jftextbox';
                h7292_error.innerHTML = 'Too long';
        } else {
        }
        var hac71 = document.getElementById('hac71_1229');
        var hac71_label = document.getElementById('hac71_1229_label');
        var hac71_error = document.getElementById('hac71_1229_error');
        if (hac71.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: hac71, msg: 'error'});
                        hac71.className = 'input-error jftextbox';
                        hac71_label.className = 'label-error jftextbox';
                        hac71_error.innerHTML = 'Field Required';
                }
        } else if (hac71.value.length > 50) {
                errorArray.push({id: hac71, msg: 'error'});
                hac71.className = 'input-error jftextbox';
                hac71_label.className = 'label-error jftextbox';
                hac71_error.innerHTML = 'Too long';
        } else {
        }
        var hb212 = document.getElementById('hb212_1230');
        var hb212_label = document.getElementById('hb212_1230_label');
        var hb212_error = document.getElementById('hb212_1230_error');
        var required = true;
        if (required) {
                if (hb212.multiple) {
                        if (hb212.selectedIndex == -1) {
                                errorArray.push({id: hb212, msg: 'error'});
                                hb212.className = 'input-error jflist';
                                hb212_label.className = 'label-error jflist';
                                hb212_error.innerHTML = 'Field Required';
                        }
                } else {
                        if (hb212.selectedIndex == 0) {
                                errorArray.push({id: hb212, msg: 'error'});
                                hb212.className = 'input-error jflist';
                                hb212_label.className = 'label-error jflist';
                                hb212_error.innerHTML = 'Field Required';
                        }
                }
        }
        var h8865 = document.getElementById('h8865_1231');
        var h8865_label = document.getElementById('h8865_1231_label');
        var h8865_error = document.getElementById('h8865_1231_error');
        if (h8865.value.length == 0) {
                var required = true;
                if (required) {
                        errorArray.push({id: h8865, msg: 'error'});
                        h8865.className = 'input-error jftextbox';
                        h8865_label.className = 'label-error jftextbox';
                        h8865_error.innerHTML = 'Field Required';
                }
        } else if (h8865.value.length > 6) {
                errorArray.push({id: h8865, msg: 'error'});
                h8865.className = 'input-error jftextbox';
                h8865_label.className = 'label-error jftextbox';
                h8865_error.innerHTML = 'Too long';
        } else {
        }
        var v = document.getElementById('h757e_1233');
        var h757e_error = document.getElementById('h757e_1233_error');
        var anySelected = false;
        for (i = 0; i < form.elements.length; i++) {
                if (form.elements[i].name == 'h757e[]' && form.elements[i].checked == true) {
                        anySelected = true;
                        break;
                }
        }
        var required = true;
        if (required && !anySelected) {
                errorArray.push({id: v, msg: 'error'});
                v.className = 'input-error jfcheckbox';
                h757e_error.innerHTML = 'Field Required';
        }
        if (errorArray.length) {
                var scroll = new Fx.Scroll(window, {
                        wait: false,
                        duration: 1000,
                        offset: {"x": 0, "y": 0},
                        transition: Fx.Transitions.Quad.easeInOut
                });
                scroll.scrollTo(window.getScrollLeft(), errorArray[0].id.getPosition().y);
                return false;
        }
        return true;
}
