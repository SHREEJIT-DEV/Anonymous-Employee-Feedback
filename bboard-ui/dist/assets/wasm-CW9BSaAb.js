let CostModel, QueryContext, StateValue, __vite__initWasm, getAugmentedNamespace, bigIntToValue$1, encodeQualifiedShieldedCoinInfo$1, dummyContractAddress$1, encodeShieldedCoinInfo$1, encodeCoinPublicKey$1, getDefaultExportFromCjs, encodeContractAddress$1, decodeShieldedCoinInfo$1, decodeQualifiedShieldedCoinInfo$1, decodeCoinPublicKey$1, decodeContractAddress$1, maxField$1, ContractState, ChargedState, persistentHash$1, ContractOperation, commonjsRequire, sampleSigningKey$1, ContractMaintenanceAuthority, signatureVerifyingKey$1, valueToBigInt$1, commonjsGlobal;
let __tla = (async ()=>{
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : {};
    getDefaultExportFromCjs = function(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
    };
    getAugmentedNamespace = function(n) {
        if (n.__esModule) return n;
        var f = n.default;
        if (typeof f == "function") {
            var a = function a2() {
                if (this instanceof a2) {
                    return Reflect.construct(f, arguments, this.constructor);
                }
                return f.apply(this, arguments);
            };
            a.prototype = f.prototype;
        } else a = {};
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        Object.keys(n).forEach(function(k) {
            var d = Object.getOwnPropertyDescriptor(n, k);
            Object.defineProperty(a, k, d.get ? d : {
                enumerable: true,
                get: function() {
                    return n[k];
                }
            });
        });
        return a;
    };
    const __vite__wasmUrl = "/assets/midnight_onchain_runtime_wasm_bg-D2U4EkPt.wasm";
    __vite__initWasm = async (opts = {}, url)=>{
        let result;
        if (url.startsWith("data:")) {
            const urlContent = url.replace(/^data:.*?base64,/, "");
            let bytes;
            if (typeof Buffer === "function" && typeof Buffer.from === "function") {
                bytes = Buffer.from(urlContent, "base64");
            } else if (typeof atob === "function") {
                const binaryString = atob(urlContent);
                bytes = new Uint8Array(binaryString.length);
                for(let i = 0; i < binaryString.length; i++){
                    bytes[i] = binaryString.charCodeAt(i);
                }
            } else {
                throw new Error("Cannot decode base64-encoded data URL");
            }
            result = await WebAssembly.instantiate(bytes, opts);
        } else {
            const response = await fetch(url);
            const contentType = response.headers.get("Content-Type") || "";
            if ("instantiateStreaming" in WebAssembly && contentType.startsWith("application/wasm")) {
                result = await WebAssembly.instantiateStreaming(response, opts);
            } else {
                const buffer = await response.arrayBuffer();
                result = await WebAssembly.instantiate(buffer, opts);
            }
        }
        return result.instance.exports;
    };
    commonjsRequire = function(path) {
        throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    };
    let wasm$1;
    function __wbg_set_wasm(val) {
        wasm$1 = val;
    }
    function addToExternrefTable0(obj) {
        const idx = wasm$1.__externref_table_alloc();
        wasm$1.__wbindgen_export_2.set(idx, obj);
        return idx;
    }
    function handleError(f, args) {
        try {
            return f.apply(this, args);
        } catch (e) {
            const idx = addToExternrefTable0(e);
            wasm$1.__wbindgen_exn_store(idx);
        }
    }
    let cachedUint8ArrayMemory0 = null;
    function getUint8ArrayMemory0() {
        if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
            cachedUint8ArrayMemory0 = new Uint8Array(wasm$1.memory.buffer);
        }
        return cachedUint8ArrayMemory0;
    }
    let cachedTextDecoder = new TextDecoder("utf-8", {
        ignoreBOM: true,
        fatal: true
    });
    cachedTextDecoder.decode();
    const MAX_SAFARI_DECODE_BYTES = 2146435072;
    let numBytesDecoded = 0;
    function decodeText(ptr, len) {
        numBytesDecoded += len;
        if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
            cachedTextDecoder = new TextDecoder("utf-8", {
                ignoreBOM: true,
                fatal: true
            });
            cachedTextDecoder.decode();
            numBytesDecoded = len;
        }
        return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
    }
    function getStringFromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        return decodeText(ptr, len);
    }
    let WASM_VECTOR_LEN = 0;
    const cachedTextEncoder = new TextEncoder();
    if (!("encodeInto" in cachedTextEncoder)) {
        cachedTextEncoder.encodeInto = function(arg, view) {
            const buf = cachedTextEncoder.encode(arg);
            view.set(buf);
            return {
                read: arg.length,
                written: buf.length
            };
        };
    }
    function passStringToWasm0(arg, malloc, realloc) {
        if (realloc === void 0) {
            const buf = cachedTextEncoder.encode(arg);
            const ptr2 = malloc(buf.length, 1) >>> 0;
            getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
            WASM_VECTOR_LEN = buf.length;
            return ptr2;
        }
        let len = arg.length;
        let ptr = malloc(len, 1) >>> 0;
        const mem = getUint8ArrayMemory0();
        let offset = 0;
        for(; offset < len; offset++){
            const code = arg.charCodeAt(offset);
            if (code > 127) break;
            mem[ptr + offset] = code;
        }
        if (offset !== len) {
            if (offset !== 0) {
                arg = arg.slice(offset);
            }
            ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
            const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
            const ret = cachedTextEncoder.encodeInto(arg, view);
            offset += ret.written;
            ptr = realloc(ptr, len, offset, 1) >>> 0;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    }
    let cachedDataViewMemory0 = null;
    function getDataViewMemory0() {
        if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm$1.memory.buffer) {
            cachedDataViewMemory0 = new DataView(wasm$1.memory.buffer);
        }
        return cachedDataViewMemory0;
    }
    function isLikeNone(x) {
        return x === void 0 || x === null;
    }
    function getArrayU8FromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
    }
    function debugString(val) {
        const type = typeof val;
        if (type == "number" || type == "boolean" || val == null) {
            return `${val}`;
        }
        if (type == "string") {
            return `"${val}"`;
        }
        if (type == "symbol") {
            const description = val.description;
            if (description == null) {
                return "Symbol";
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == "function") {
            const name = val.name;
            if (typeof name == "string" && name.length > 0) {
                return `Function(${name})`;
            } else {
                return "Function";
            }
        }
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = "[";
            if (length > 0) {
                debug += debugString(val[0]);
            }
            for(let i = 1; i < length; i++){
                debug += ", " + debugString(val[i]);
            }
            debug += "]";
            return debug;
        }
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches && builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            return toString.call(val);
        }
        if (className == "Object") {
            try {
                return "Object(" + JSON.stringify(val) + ")";
            } catch (_) {
                return "Object";
            }
        }
        if (val instanceof Error) {
            return `${val.name}: ${val.message}
${val.stack}`;
        }
        return className;
    }
    const CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((state)=>{
        wasm$1.__wbindgen_export_5.get(state.dtor)(state.a, state.b);
    });
    function makeMutClosure(arg0, arg1, dtor, f) {
        const state = {
            a: arg0,
            b: arg1,
            cnt: 1,
            dtor
        };
        const real = (...args)=>{
            state.cnt++;
            const a = state.a;
            state.a = 0;
            try {
                return f(a, state.b, ...args);
            } finally{
                if (--state.cnt === 0) {
                    wasm$1.__wbindgen_export_5.get(state.dtor)(a, state.b);
                    CLOSURE_DTORS.unregister(state);
                } else {
                    state.a = a;
                }
            }
        };
        real.original = state;
        CLOSURE_DTORS.register(real, state, state);
        return real;
    }
    function takeFromExternrefTable0(idx) {
        const value = wasm$1.__wbindgen_export_2.get(idx);
        wasm$1.__externref_table_dealloc(idx);
        return value;
    }
    dummyContractAddress$1 = function() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm$1.dummyContractAddress();
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0;
                len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally{
            wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    };
    bigIntToValue$1 = function(x) {
        const ret = wasm$1.bigIntToValue(x);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };
    signatureVerifyingKey$1 = function(key) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(key, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm$1.signatureVerifyingKey(ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0;
                len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally{
            wasm$1.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    };
    maxField$1 = function() {
        const ret = wasm$1.maxField();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };
    sampleSigningKey$1 = function() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm$1.sampleSigningKey();
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0;
                len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally{
            wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    };
    persistentHash$1 = function(align, val) {
        const ret = wasm$1.persistentHash(align, val);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };
    valueToBigInt$1 = function(x) {
        const ret = wasm$1.valueToBigInt(x);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };
    encodeContractAddress$1 = function(addr) {
        const ptr0 = passStringToWasm0(addr, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.encodeContractAddress(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };
    decodeCoinPublicKey$1 = function(pk) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm$1.decodeCoinPublicKey(pk);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0;
                len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally{
            wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    };
    encodeCoinPublicKey$1 = function(pk) {
        const ptr0 = passStringToWasm0(pk, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm$1.encodeCoinPublicKey(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };
    encodeShieldedCoinInfo$1 = function(coin) {
        const ret = wasm$1.encodeShieldedCoinInfo(coin);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };
    decodeShieldedCoinInfo$1 = function(coin) {
        const ret = wasm$1.decodeShieldedCoinInfo(coin);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };
    decodeContractAddress$1 = function(addr) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm$1.decodeContractAddress(addr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0;
                len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally{
            wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    };
    decodeQualifiedShieldedCoinInfo$1 = function(coin) {
        const ret = wasm$1.decodeQualifiedShieldedCoinInfo(coin);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };
    encodeQualifiedShieldedCoinInfo$1 = function(coin) {
        const ret = wasm$1.encodeQualifiedShieldedCoinInfo(coin);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    };
    function _assertClass(instance, klass) {
        if (!(instance instanceof klass)) {
            throw new Error(`expected instance of ${klass.name}`);
        }
    }
    function getArrayJsValueFromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        const mem = getDataViewMemory0();
        const result = [];
        for(let i = ptr; i < ptr + 4 * len; i += 4){
            result.push(wasm$1.__wbindgen_export_2.get(mem.getUint32(i, true)));
        }
        wasm$1.__externref_drop_slice(ptr, len);
        return result;
    }
    function __wbg_adapter_14(arg0, arg1, arg2) {
        wasm$1.closure690_externref_shim(arg0, arg1, arg2);
    }
    function __wbg_adapter_258(arg0, arg1, arg2, arg3) {
        wasm$1.closure730_externref_shim(arg0, arg1, arg2, arg3);
    }
    const ChargedStateFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_chargedstate_free(ptr >>> 0, 1));
    ChargedState = class {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(ChargedState.prototype);
            obj.__wbg_ptr = ptr;
            ChargedStateFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ChargedStateFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_chargedstate_free(ptr, 0);
        }
        constructor(state){
            _assertClass(state, StateValue);
            const ret = wasm$1.chargedstate_new(state.__wbg_ptr);
            this.__wbg_ptr = ret >>> 0;
            ChargedStateFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        get state() {
            const ret = wasm$1.chargedstate_state(this.__wbg_ptr);
            return StateValue.__wrap(ret);
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.chargedstate_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    };
    if (Symbol.dispose) ChargedState.prototype[Symbol.dispose] = ChargedState.prototype.free;
    const ContractMaintenanceAuthorityFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_contractmaintenanceauthority_free(ptr >>> 0, 1));
    ContractMaintenanceAuthority = class {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(ContractMaintenanceAuthority.prototype);
            obj.__wbg_ptr = ptr;
            ContractMaintenanceAuthorityFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ContractMaintenanceAuthorityFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_contractmaintenanceauthority_free(ptr, 0);
        }
        static deserialize(raw) {
            const ret = wasm$1.contractmaintenanceauthority_deserialize(raw);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return ContractMaintenanceAuthority.__wrap(ret[0]);
        }
        constructor(committee, threshold, counter){
            const ret = wasm$1.contractmaintenanceauthority_new(committee, threshold, isLikeNone(counter) ? 0 : addToExternrefTable0(counter));
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            ContractMaintenanceAuthorityFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        get counter() {
            const ret = wasm$1.contractmaintenanceauthority_counter(this.__wbg_ptr);
            return ret;
        }
        get committee() {
            const ret = wasm$1.contractmaintenanceauthority_committee(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        serialize() {
            const ret = wasm$1.contractmaintenanceauthority_serialize(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        get threshold() {
            const ret = wasm$1.contractmaintenanceauthority_threshold(this.__wbg_ptr);
            return ret >>> 0;
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.contractmaintenanceauthority_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    };
    if (Symbol.dispose) ContractMaintenanceAuthority.prototype[Symbol.dispose] = ContractMaintenanceAuthority.prototype.free;
    const ContractOperationFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_contractoperation_free(ptr >>> 0, 1));
    ContractOperation = class {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(ContractOperation.prototype);
            obj.__wbg_ptr = ptr;
            ContractOperationFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ContractOperationFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_contractoperation_free(ptr, 0);
        }
        static deserialize(raw) {
            const ret = wasm$1.contractoperation_deserialize(raw);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return ContractOperation.__wrap(ret[0]);
        }
        get verifierKey() {
            const ret = wasm$1.contractoperation_verifier_key(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        set verifierKey(key) {
            const ret = wasm$1.contractoperation_set_verifier_key(this.__wbg_ptr, key);
            if (ret[1]) {
                throw takeFromExternrefTable0(ret[0]);
            }
        }
        constructor(){
            const ret = wasm$1.contractoperation_new();
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            ContractOperationFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        serialize() {
            const ret = wasm$1.contractoperation_serialize(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.contractoperation_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    };
    if (Symbol.dispose) ContractOperation.prototype[Symbol.dispose] = ContractOperation.prototype.free;
    const ContractStateFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_contractstate_free(ptr >>> 0, 1));
    ContractState = class {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(ContractState.prototype);
            obj.__wbg_ptr = ptr;
            ContractStateFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ContractStateFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_contractstate_free(ptr, 0);
        }
        operations() {
            const ret = wasm$1.contractstate_operations(this.__wbg_ptr);
            var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
            return v1;
        }
        static deserialize(raw) {
            const ret = wasm$1.contractstate_deserialize(raw);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return ContractState.__wrap(ret[0]);
        }
        set balance(value_map) {
            const ret = wasm$1.contractstate_set_balance(this.__wbg_ptr, value_map);
            if (ret[1]) {
                throw takeFromExternrefTable0(ret[0]);
            }
        }
        setOperation(operation, value) {
            _assertClass(value, ContractOperation);
            const ret = wasm$1.contractstate_setOperation(this.__wbg_ptr, operation, value.__wbg_ptr);
            if (ret[1]) {
                throw takeFromExternrefTable0(ret[0]);
            }
        }
        get maintenanceAuthority() {
            const ret = wasm$1.contractstate_maintenance_authority(this.__wbg_ptr);
            return ContractMaintenanceAuthority.__wrap(ret);
        }
        set maintenanceAuthority(authority) {
            _assertClass(authority, ContractMaintenanceAuthority);
            wasm$1.contractstate_set_maintenance_authority(this.__wbg_ptr, authority.__wbg_ptr);
        }
        constructor(){
            const ret = wasm$1.contractstate_new();
            this.__wbg_ptr = ret >>> 0;
            ContractStateFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        get data() {
            const ret = wasm$1.contractstate_data(this.__wbg_ptr);
            return ChargedState.__wrap(ret);
        }
        query(query, cost_model) {
            _assertClass(cost_model, CostModel);
            const ret = wasm$1.contractstate_query(this.__wbg_ptr, query, cost_model.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        get balance() {
            const ret = wasm$1.contractstate_balance(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        set data(data) {
            _assertClass(data, ChargedState);
            wasm$1.contractstate_set_data(this.__wbg_ptr, data.__wbg_ptr);
        }
        operation(operation) {
            const ret = wasm$1.contractstate_operation(this.__wbg_ptr, operation);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return ret[0] === 0 ? void 0 : ContractOperation.__wrap(ret[0]);
        }
        serialize() {
            const ret = wasm$1.contractstate_serialize(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.contractstate_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    };
    if (Symbol.dispose) ContractState.prototype[Symbol.dispose] = ContractState.prototype.free;
    const CostModelFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_costmodel_free(ptr >>> 0, 1));
    CostModel = class {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(CostModel.prototype);
            obj.__wbg_ptr = ptr;
            CostModelFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            CostModelFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_costmodel_free(ptr, 0);
        }
        static initialCostModel() {
            const ret = wasm$1.costmodel_initialCostModel();
            return CostModel.__wrap(ret);
        }
        constructor(){
            const ret = wasm$1.costmodel_new();
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            CostModelFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.costmodel_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    };
    if (Symbol.dispose) CostModel.prototype[Symbol.dispose] = CostModel.prototype.free;
    typeof FinalizationRegistry === "undefined" ? {} : new FinalizationRegistry((ptr)=>wasm$1.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));
    typeof FinalizationRegistry === "undefined" ? {} : new FinalizationRegistry((ptr)=>wasm$1.__wbg_intounderlyingsink_free(ptr >>> 0, 1));
    typeof FinalizationRegistry === "undefined" ? {} : new FinalizationRegistry((ptr)=>wasm$1.__wbg_intounderlyingsource_free(ptr >>> 0, 1));
    const QueryContextFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_querycontext_free(ptr >>> 0, 1));
    QueryContext = class {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(QueryContext.prototype);
            obj.__wbg_ptr = ptr;
            QueryContextFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            QueryContextFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_querycontext_free(ptr, 0);
        }
        get comIndices() {
            const ret = wasm$1.querycontext_com_indices(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        set effects(effects) {
            const ret = wasm$1.querycontext_set_effects(this.__wbg_ptr, effects);
            if (ret[1]) {
                throw takeFromExternrefTable0(ret[0]);
            }
        }
        toVmStack() {
            const ret = wasm$1.querycontext_toVmStack(this.__wbg_ptr);
            return VmStack.__wrap(ret);
        }
        runTranscript(transcript, cost_model) {
            _assertClass(cost_model, CostModel);
            const ret = wasm$1.querycontext_runTranscript(this.__wbg_ptr, transcript, cost_model.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return QueryContext.__wrap(ret[0]);
        }
        insertCommitment(comm, index) {
            const ptr0 = passStringToWasm0(comm, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm$1.querycontext_insertCommitment(this.__wbg_ptr, ptr0, len0, index);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return QueryContext.__wrap(ret[0]);
        }
        constructor(state, address){
            _assertClass(state, ChargedState);
            const ptr0 = passStringToWasm0(address, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm$1.querycontext_new(state.__wbg_ptr, ptr0, len0);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            QueryContextFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        get block() {
            const ret = wasm$1.querycontext_block(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        query(ops, cost_model, gas_limit) {
            _assertClass(cost_model, CostModel);
            const ret = wasm$1.querycontext_query(this.__wbg_ptr, ops, cost_model.__wbg_ptr, gas_limit);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return QueryResults.__wrap(ret[0]);
        }
        get state() {
            const ret = wasm$1.querycontext_state(this.__wbg_ptr);
            return ChargedState.__wrap(ret);
        }
        get address() {
            let deferred2_0;
            let deferred2_1;
            try {
                const ret = wasm$1.querycontext_address(this.__wbg_ptr);
                var ptr1 = ret[0];
                var len1 = ret[1];
                if (ret[3]) {
                    ptr1 = 0;
                    len1 = 0;
                    throw takeFromExternrefTable0(ret[2]);
                }
                deferred2_0 = ptr1;
                deferred2_1 = len1;
                return getStringFromWasm0(ptr1, len1);
            } finally{
                wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);
            }
        }
        get effects() {
            const ret = wasm$1.querycontext_effects(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        qualify(coin) {
            const ret = wasm$1.querycontext_qualify(this.__wbg_ptr, coin);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        set block(block) {
            const ret = wasm$1.querycontext_set_block(this.__wbg_ptr, block);
            if (ret[1]) {
                throw takeFromExternrefTable0(ret[0]);
            }
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.querycontext_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    };
    if (Symbol.dispose) QueryContext.prototype[Symbol.dispose] = QueryContext.prototype.free;
    const QueryResultsFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_queryresults_free(ptr >>> 0, 1));
    class QueryResults {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(QueryResults.prototype);
            obj.__wbg_ptr = ptr;
            QueryResultsFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            QueryResultsFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_queryresults_free(ptr, 0);
        }
        constructor(){
            const ret = wasm$1.queryresults_new();
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            QueryResultsFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        get events() {
            const ret = wasm$1.queryresults_events(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        get context() {
            const ret = wasm$1.queryresults_context(this.__wbg_ptr);
            return QueryContext.__wrap(ret);
        }
        get gasCost() {
            const ret = wasm$1.queryresults_gas_cost(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.queryresults_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    }
    if (Symbol.dispose) QueryResults.prototype[Symbol.dispose] = QueryResults.prototype.free;
    const StateBoundedMerkleTreeFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_stateboundedmerkletree_free(ptr >>> 0, 1));
    class StateBoundedMerkleTree {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(StateBoundedMerkleTree.prototype);
            obj.__wbg_ptr = ptr;
            StateBoundedMerkleTreeFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            StateBoundedMerkleTreeFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_stateboundedmerkletree_free(ptr, 0);
        }
        pathForLeaf(index, leaf) {
            const ret = wasm$1.stateboundedmerkletree_pathForLeaf(this.__wbg_ptr, index, leaf);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        findPathForLeaf(leaf) {
            const ret = wasm$1.stateboundedmerkletree_findPathForLeaf(this.__wbg_ptr, leaf);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        root() {
            const ret = wasm$1.stateboundedmerkletree_root(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        constructor(height){
            const ret = wasm$1.stateboundedmerkletree_blank(height);
            this.__wbg_ptr = ret >>> 0;
            StateBoundedMerkleTreeFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        get height() {
            const ret = wasm$1.stateboundedmerkletree_height(this.__wbg_ptr);
            return ret;
        }
        rehash() {
            const ret = wasm$1.stateboundedmerkletree_rehash(this.__wbg_ptr);
            return StateBoundedMerkleTree.__wrap(ret);
        }
        update(index, leaf) {
            const ret = wasm$1.stateboundedmerkletree_update(this.__wbg_ptr, index, leaf);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return StateBoundedMerkleTree.__wrap(ret[0]);
        }
        collapse(start, end) {
            const ret = wasm$1.stateboundedmerkletree_collapse(this.__wbg_ptr, start, end);
            return StateBoundedMerkleTree.__wrap(ret);
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.stateboundedmerkletree_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    }
    if (Symbol.dispose) StateBoundedMerkleTree.prototype[Symbol.dispose] = StateBoundedMerkleTree.prototype.free;
    const StateMapFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_statemap_free(ptr >>> 0, 1));
    class StateMap {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(StateMap.prototype);
            obj.__wbg_ptr = ptr;
            StateMapFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            StateMapFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_statemap_free(ptr, 0);
        }
        get(key) {
            const ret = wasm$1.statemap_get(this.__wbg_ptr, key);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return ret[0] === 0 ? void 0 : StateValue.__wrap(ret[0]);
        }
        constructor(){
            const ret = wasm$1.statemap_new();
            this.__wbg_ptr = ret >>> 0;
            StateMapFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        keys() {
            const ret = wasm$1.statemap_keys(this.__wbg_ptr);
            if (ret[3]) {
                throw takeFromExternrefTable0(ret[2]);
            }
            var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
            return v1;
        }
        insert(key, value) {
            _assertClass(value, StateValue);
            const ret = wasm$1.statemap_insert(this.__wbg_ptr, key, value.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return StateMap.__wrap(ret[0]);
        }
        remove(key) {
            const ret = wasm$1.statemap_remove(this.__wbg_ptr, key);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return StateMap.__wrap(ret[0]);
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.statemap_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    }
    if (Symbol.dispose) StateMap.prototype[Symbol.dispose] = StateMap.prototype.free;
    const StateValueFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_statevalue_free(ptr >>> 0, 1));
    StateValue = class {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(StateValue.prototype);
            obj.__wbg_ptr = ptr;
            StateValueFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            StateValueFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_statevalue_free(ptr, 0);
        }
        arrayPush(value) {
            _assertClass(value, StateValue);
            const ret = wasm$1.statevalue_arrayPush(this.__wbg_ptr, value.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return StateValue.__wrap(ret[0]);
        }
        asBoundedMerkleTree() {
            const ret = wasm$1.statevalue_asBoundedMerkleTree(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return ret[0] === 0 ? void 0 : StateBoundedMerkleTree.__wrap(ret[0]);
        }
        static newBoundedMerkleTree(tree) {
            _assertClass(tree, StateBoundedMerkleTree);
            const ret = wasm$1.statevalue_newBoundedMerkleTree(tree.__wbg_ptr);
            return StateValue.__wrap(ret);
        }
        constructor(){
            const ret = wasm$1.statevalue_new();
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            this.__wbg_ptr = ret[0] >>> 0;
            StateValueFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        type() {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.statevalue_type(this.__wbg_ptr);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
        asMap() {
            const ret = wasm$1.statevalue_asMap(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return ret[0] === 0 ? void 0 : StateMap.__wrap(ret[0]);
        }
        static decode(value) {
            const ret = wasm$1.statevalue_decode(value);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return StateValue.__wrap(ret[0]);
        }
        encode() {
            const ret = wasm$1.statevalue_encode(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        asCell() {
            const ret = wasm$1.statevalue_asCell(this.__wbg_ptr);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return takeFromExternrefTable0(ret[0]);
        }
        static newMap(map) {
            _assertClass(map, StateMap);
            const ret = wasm$1.statevalue_newMap(map.__wbg_ptr);
            return StateValue.__wrap(ret);
        }
        asArray() {
            const ret = wasm$1.statevalue_asArray(this.__wbg_ptr);
            if (ret[3]) {
                throw takeFromExternrefTable0(ret[2]);
            }
            let v1;
            if (ret[0] !== 0) {
                v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
                wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
            }
            return v1;
        }
        logSize() {
            const ret = wasm$1.statevalue_logSize(this.__wbg_ptr);
            return ret >>> 0;
        }
        static newCell(value) {
            const ret = wasm$1.statevalue_newCell(value);
            if (ret[2]) {
                throw takeFromExternrefTable0(ret[1]);
            }
            return StateValue.__wrap(ret[0]);
        }
        static newNull() {
            const ret = wasm$1.statevalue_newNull();
            return StateValue.__wrap(ret);
        }
        static newArray() {
            const ret = wasm$1.statevalue_newArray();
            return StateValue.__wrap(ret);
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.statevalue_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    };
    if (Symbol.dispose) StateValue.prototype[Symbol.dispose] = StateValue.prototype.free;
    typeof FinalizationRegistry === "undefined" ? {} : new FinalizationRegistry((ptr)=>wasm$1.__wbg_vmresults_free(ptr >>> 0, 1));
    const VmStackFinalization = typeof FinalizationRegistry === "undefined" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((ptr)=>wasm$1.__wbg_vmstack_free(ptr >>> 0, 1));
    class VmStack {
        static __wrap(ptr) {
            ptr = ptr >>> 0;
            const obj = Object.create(VmStack.prototype);
            obj.__wbg_ptr = ptr;
            VmStackFinalization.register(obj, obj.__wbg_ptr, obj);
            return obj;
        }
        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            VmStackFinalization.unregister(this);
            return ptr;
        }
        free() {
            const ptr = this.__destroy_into_raw();
            wasm$1.__wbg_vmstack_free(ptr, 0);
        }
        removeLast() {
            wasm$1.vmstack_removeLast(this.__wbg_ptr);
        }
        get(idx) {
            const ret = wasm$1.vmstack_get(this.__wbg_ptr, idx);
            return ret === 0 ? void 0 : StateValue.__wrap(ret);
        }
        constructor(){
            const ret = wasm$1.vmstack_new();
            this.__wbg_ptr = ret >>> 0;
            VmStackFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        push(value, is_strong) {
            _assertClass(value, StateValue);
            wasm$1.vmstack_push(this.__wbg_ptr, value.__wbg_ptr, is_strong);
        }
        length() {
            const ret = wasm$1.vmstack_length(this.__wbg_ptr);
            return ret >>> 0;
        }
        isStrong(idx) {
            const ret = wasm$1.vmstack_isStrong(this.__wbg_ptr, idx);
            return ret === 16777215 ? void 0 : ret !== 0;
        }
        toString(compact) {
            let deferred1_0;
            let deferred1_1;
            try {
                const ret = wasm$1.vmstack_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
                deferred1_0 = ret[0];
                deferred1_1 = ret[1];
                return getStringFromWasm0(ret[0], ret[1]);
            } finally{
                wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }
    }
    if (Symbol.dispose) VmStack.prototype[Symbol.dispose] = VmStack.prototype.free;
    function __wbg_BigInt_40a77d45cca49470() {
        return handleError(function(arg0) {
            const ret = BigInt(arg0);
            return ret;
        }, arguments);
    }
    function __wbg_BigInt_6adbfd8eb0f7ec07(arg0) {
        const ret = BigInt(arg0);
        return ret;
    }
    function __wbg_Error_e17e777aac105295(arg0, arg1) {
        const ret = Error(getStringFromWasm0(arg0, arg1));
        return ret;
    }
    function __wbg_Number_998bea33bd87c3e0(arg0) {
        const ret = Number(arg0);
        return ret;
    }
    function __wbg_String_8f0eb39a4a4c2f66(arg0, arg1) {
        const ret = String(arg1);
        const ptr1 = passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }
    function __wbg_buffer_8d40b1d762fb3c66(arg0) {
        const ret = arg0.buffer;
        return ret;
    }
    function __wbg_byobRequest_2c036bceca1e6037(arg0) {
        const ret = arg0.byobRequest;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }
    function __wbg_byteLength_331a6b5545834024(arg0) {
        const ret = arg0.byteLength;
        return ret;
    }
    function __wbg_byteOffset_49a5b5608000358b(arg0) {
        const ret = arg0.byteOffset;
        return ret;
    }
    function __wbg_call_13410aac570ffff7() {
        return handleError(function(arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments);
    }
    function __wbg_call_a5400b25a865cfd8() {
        return handleError(function(arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments);
    }
    function __wbg_close_cccada6053ee3a65() {
        return handleError(function(arg0) {
            arg0.close();
        }, arguments);
    }
    function __wbg_close_d71a78219dc23e91() {
        return handleError(function(arg0) {
            arg0.close();
        }, arguments);
    }
    function __wbg_contractstate_new(arg0) {
        const ret = ContractState.__wrap(arg0);
        return ret;
    }
    function __wbg_crypto_86f2631e91b51511(arg0) {
        const ret = arg0.crypto;
        return ret;
    }
    function __wbg_done_75ed0ee6dd243d9d(arg0) {
        const ret = arg0.done;
        return ret;
    }
    function __wbg_enqueue_452bc2343d1c2ff9() {
        return handleError(function(arg0, arg1) {
            arg0.enqueue(arg1);
        }, arguments);
    }
    function __wbg_entries_2be2f15bd5554996(arg0) {
        const ret = Object.entries(arg0);
        return ret;
    }
    function __wbg_from_88bc52ce20ba6318(arg0) {
        const ret = Array.from(arg0);
        return ret;
    }
    function __wbg_getRandomValues_b3f15fcbfabb0f8b() {
        return handleError(function(arg0, arg1) {
            arg0.getRandomValues(arg1);
        }, arguments);
    }
    function __wbg_get_0da715ceaecea5c8(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    }
    function __wbg_get_458e874b43b18b25() {
        return handleError(function(arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments);
    }
    function __wbg_get_5ee3191755594360(arg0, arg1) {
        const ret = arg0.get(arg1);
        return ret;
    }
    function __wbg_getwithrefkey_1dc361bd10053bfe(arg0, arg1) {
        const ret = arg0[arg1];
        return ret;
    }
    function __wbg_instanceof_ArrayBuffer_67f3012529f6a2dd(arg0) {
        let result;
        try {
            result = arg0 instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    }
    function __wbg_instanceof_Map_ebb01a5b6b5ffd0b(arg0) {
        let result;
        try {
            result = arg0 instanceof Map;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    }
    function __wbg_instanceof_Uint8Array_9a8378d955933db7(arg0) {
        let result;
        try {
            result = arg0 instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    }
    function __wbg_isArray_030cce220591fb41(arg0) {
        const ret = Array.isArray(arg0);
        return ret;
    }
    function __wbg_isSafeInteger_1c0d1af5542e102a(arg0) {
        const ret = Number.isSafeInteger(arg0);
        return ret;
    }
    function __wbg_iterator_f370b34483c71a1c() {
        const ret = Symbol.iterator;
        return ret;
    }
    function __wbg_keys_822161a7faf55538(arg0) {
        const ret = arg0.keys();
        return ret;
    }
    function __wbg_length_186546c51cd61acd(arg0) {
        const ret = arg0.length;
        return ret;
    }
    function __wbg_length_6bb7e81f9d7713e4(arg0) {
        const ret = arg0.length;
        return ret;
    }
    function __wbg_msCrypto_d562bbe83e0d4b91(arg0) {
        const ret = arg0.msCrypto;
        return ret;
    }
    function __wbg_new_19c25a3f2fa63a02() {
        const ret = new Object();
        return ret;
    }
    function __wbg_new_1f3a344cf3123716() {
        const ret = new Array();
        return ret;
    }
    function __wbg_new_2e3c58a15f39f5f9(arg0, arg1) {
        try {
            var state0 = {
                a: arg0,
                b: arg1
            };
            var cb0 = (arg02, arg12)=>{
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_258(a, state0.b, arg02, arg12);
                } finally{
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return ret;
        } finally{
            state0.a = state0.b = 0;
        }
    }
    function __wbg_new_2ff1f68f3676ea53() {
        const ret = new Map();
        return ret;
    }
    function __wbg_new_638ebfaedbf32a5e(arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    }
    function __wbg_new_da9dc54c5db29dfa(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    }
    function __wbg_newfromslice_074c56947bd43469(arg0, arg1) {
        const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
        return ret;
    }
    function __wbg_newnoargs_254190557c45b4ec(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    }
    function __wbg_newwithbyteoffsetandlength_e8f53910b4d42b45(arg0, arg1, arg2) {
        const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }
    function __wbg_newwithlength_a167dcc7aaa3ba77(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return ret;
    }
    function __wbg_next_5b3530e612fde77d(arg0) {
        const ret = arg0.next;
        return ret;
    }
    function __wbg_next_692e82279131b03c() {
        return handleError(function(arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments);
    }
    function __wbg_node_e1f24f89a7336c2e(arg0) {
        const ret = arg0.node;
        return ret;
    }
    function __wbg_process_3975fd6c72f520aa(arg0) {
        const ret = arg0.process;
        return ret;
    }
    function __wbg_prototypesetcall_3d4a26c1ed734349(arg0, arg1, arg2) {
        Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
    }
    function __wbg_push_330b2eb93e4e1212(arg0, arg1) {
        const ret = arg0.push(arg1);
        return ret;
    }
    function __wbg_queueMicrotask_25d0739ac89e8c88(arg0) {
        queueMicrotask(arg0);
    }
    function __wbg_queueMicrotask_4488407636f5bf24(arg0) {
        const ret = arg0.queueMicrotask;
        return ret;
    }
    function __wbg_randomFillSync_f8c153b79f285817() {
        return handleError(function(arg0, arg1) {
            arg0.randomFillSync(arg1);
        }, arguments);
    }
    function __wbg_require_b74f47fc2d022fd6() {
        return handleError(function() {
            const ret = commonjsRequire;
            return ret;
        }, arguments);
    }
    function __wbg_resolve_4055c623acdd6a1b(arg0) {
        const ret = Promise.resolve(arg0);
        return ret;
    }
    function __wbg_respond_6c2c4e20ef85138e() {
        return handleError(function(arg0, arg1) {
            arg0.respond(arg1 >>> 0);
        }, arguments);
    }
    function __wbg_set_1353b2a5e96bc48c(arg0, arg1, arg2) {
        arg0.set(getArrayU8FromWasm0(arg1, arg2));
    }
    function __wbg_set_3f1d0b984ed272ed(arg0, arg1, arg2) {
        arg0[arg1] = arg2;
    }
    function __wbg_set_90f6c0f7bd8c0415(arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }
    function __wbg_set_b7f1cf4fae26fe2a(arg0, arg1, arg2) {
        const ret = arg0.set(arg1, arg2);
        return ret;
    }
    function __wbg_statevalue_new(arg0) {
        const ret = StateValue.__wrap(arg0);
        return ret;
    }
    function __wbg_static_accessor_GLOBAL_8921f820c2ce3f12() {
        const ret = typeof globalThis === "undefined" ? null : globalThis;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }
    function __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184() {
        const ret = typeof globalThis === "undefined" ? null : globalThis;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }
    function __wbg_static_accessor_SELF_995b214ae681ff99() {
        const ret = typeof self === "undefined" ? null : self;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }
    function __wbg_static_accessor_WINDOW_cde3890479c675ea() {
        const ret = typeof window === "undefined" ? null : window;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }
    function __wbg_subarray_70fd07feefe14294(arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }
    function __wbg_then_e22500defe16819f(arg0, arg1) {
        const ret = arg0.then(arg1);
        return ret;
    }
    function __wbg_toString_7268338f40012a03() {
        return handleError(function(arg0, arg1) {
            const ret = arg0.toString(arg1);
            return ret;
        }, arguments);
    }
    function __wbg_toString_d8f537919ef401d6(arg0) {
        const ret = arg0.toString();
        return ret;
    }
    function __wbg_value_dd9372230531eade(arg0) {
        const ret = arg0.value;
        return ret;
    }
    function __wbg_versions_4e31226f5e8dc909(arg0) {
        const ret = arg0.versions;
        return ret;
    }
    function __wbg_view_91cc97d57ab30530(arg0) {
        const ret = arg0.view;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }
    function __wbg_wbindgenbigintgetasi64_ac743ece6ab9bba1(arg0, arg1) {
        const v = arg1;
        const ret = typeof v === "bigint" ? v : void 0;
        getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    }
    function __wbg_wbindgenbooleanget_3fe6f642c7d97746(arg0) {
        const v = arg0;
        const ret = typeof v === "boolean" ? v : void 0;
        return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
    }
    function __wbg_wbindgencbdrop_eb10308566512b88(arg0) {
        const obj = arg0.original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    }
    function __wbg_wbindgendebugstring_99ef257a3ddda34d(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }
    function __wbg_wbindgenin_d7a1ee10933d2d55(arg0, arg1) {
        const ret = arg0 in arg1;
        return ret;
    }
    function __wbg_wbindgenisbigint_ecb90cc08a5a9154(arg0) {
        const ret = typeof arg0 === "bigint";
        return ret;
    }
    function __wbg_wbindgenisfunction_8cee7dce3725ae74(arg0) {
        const ret = typeof arg0 === "function";
        return ret;
    }
    function __wbg_wbindgenisnull_f3037694abe4d97a(arg0) {
        const ret = arg0 === null;
        return ret;
    }
    function __wbg_wbindgenisobject_307a53c6bd97fbf8(arg0) {
        const val = arg0;
        const ret = typeof val === "object" && val !== null;
        return ret;
    }
    function __wbg_wbindgenisstring_d4fa939789f003b0(arg0) {
        const ret = typeof arg0 === "string";
        return ret;
    }
    function __wbg_wbindgenisundefined_c4b71d073b92f3c5(arg0) {
        const ret = arg0 === void 0;
        return ret;
    }
    function __wbg_wbindgenjsvaleq_e6f2ad59ccae1b58(arg0, arg1) {
        const ret = arg0 === arg1;
        return ret;
    }
    function __wbg_wbindgenjsvallooseeq_9bec8c9be826bed1(arg0, arg1) {
        const ret = arg0 == arg1;
        return ret;
    }
    function __wbg_wbindgennumberget_f74b4c7525ac05cb(arg0, arg1) {
        const obj = arg1;
        const ret = typeof obj === "number" ? obj : void 0;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    }
    function __wbg_wbindgenshr_7d2aae6044c0dab1(arg0, arg1) {
        const ret = arg0 >> arg1;
        return ret;
    }
    function __wbg_wbindgenstringget_0f16a6ddddef376f(arg0, arg1) {
        const obj = arg1;
        const ret = typeof obj === "string" ? obj : void 0;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }
    function __wbg_wbindgenthrow_451ec1a8469d7eb6(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    }
    function __wbindgen_cast_2241b6af4c4b2941(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    }
    function __wbindgen_cast_4625c577ab2ec9ee(arg0) {
        const ret = BigInt.asUintN(64, arg0);
        return ret;
    }
    function __wbindgen_cast_9ae0607507abb057(arg0) {
        const ret = arg0;
        return ret;
    }
    function __wbindgen_cast_9f23747c70687cbf(arg0, arg1) {
        const ret = makeMutClosure(arg0, arg1, 689, __wbg_adapter_14);
        return ret;
    }
    function __wbindgen_cast_cb9088102bce6b30(arg0, arg1) {
        const ret = getArrayU8FromWasm0(arg0, arg1);
        return ret;
    }
    function __wbindgen_cast_d6cd19b81560fd6e(arg0) {
        const ret = arg0;
        return ret;
    }
    function __wbindgen_cast_e7b45dd881f38ce3(arg0, arg1) {
        const ret = BigInt.asUintN(64, arg0) | BigInt.asUintN(64, arg1) << BigInt(64);
        return ret;
    }
    function __wbindgen_init_externref_table() {
        const table = wasm$1.__wbindgen_export_2;
        const offset = table.grow(4);
        table.set(0, void 0);
        table.set(offset + 0, void 0);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
    }
    URL = globalThis.URL;
    const __vite__wasmModule = await __vite__initWasm({
        "./midnight_onchain_runtime_wasm_bg.js": {
            "__wbg_statevalue_new": __wbg_statevalue_new,
            "__wbg_contractstate_new": __wbg_contractstate_new,
            "__wbg_getwithrefkey_1dc361bd10053bfe": __wbg_getwithrefkey_1dc361bd10053bfe,
            "__wbg_set_3f1d0b984ed272ed": __wbg_set_3f1d0b984ed272ed,
            "__wbg_String_8f0eb39a4a4c2f66": __wbg_String_8f0eb39a4a4c2f66,
            "__wbg_queueMicrotask_25d0739ac89e8c88": __wbg_queueMicrotask_25d0739ac89e8c88,
            "__wbg_queueMicrotask_4488407636f5bf24": __wbg_queueMicrotask_4488407636f5bf24,
            "__wbg_respond_6c2c4e20ef85138e": __wbg_respond_6c2c4e20ef85138e,
            "__wbg_view_91cc97d57ab30530": __wbg_view_91cc97d57ab30530,
            "__wbg_byobRequest_2c036bceca1e6037": __wbg_byobRequest_2c036bceca1e6037,
            "__wbg_close_cccada6053ee3a65": __wbg_close_cccada6053ee3a65,
            "__wbg_enqueue_452bc2343d1c2ff9": __wbg_enqueue_452bc2343d1c2ff9,
            "__wbg_close_d71a78219dc23e91": __wbg_close_d71a78219dc23e91,
            "__wbg_crypto_86f2631e91b51511": __wbg_crypto_86f2631e91b51511,
            "__wbg_process_3975fd6c72f520aa": __wbg_process_3975fd6c72f520aa,
            "__wbg_versions_4e31226f5e8dc909": __wbg_versions_4e31226f5e8dc909,
            "__wbg_node_e1f24f89a7336c2e": __wbg_node_e1f24f89a7336c2e,
            "__wbg_require_b74f47fc2d022fd6": __wbg_require_b74f47fc2d022fd6,
            "__wbg_msCrypto_d562bbe83e0d4b91": __wbg_msCrypto_d562bbe83e0d4b91,
            "__wbg_getRandomValues_b3f15fcbfabb0f8b": __wbg_getRandomValues_b3f15fcbfabb0f8b,
            "__wbg_randomFillSync_f8c153b79f285817": __wbg_randomFillSync_f8c153b79f285817,
            "__wbg_byteLength_331a6b5545834024": __wbg_byteLength_331a6b5545834024,
            "__wbg_byteOffset_49a5b5608000358b": __wbg_byteOffset_49a5b5608000358b,
            "__wbg_newfromslice_074c56947bd43469": __wbg_newfromslice_074c56947bd43469,
            "__wbg_newwithlength_a167dcc7aaa3ba77": __wbg_newwithlength_a167dcc7aaa3ba77,
            "__wbg_newwithbyteoffsetandlength_e8f53910b4d42b45": __wbg_newwithbyteoffsetandlength_e8f53910b4d42b45,
            "__wbg_new_638ebfaedbf32a5e": __wbg_new_638ebfaedbf32a5e,
            "__wbg_buffer_8d40b1d762fb3c66": __wbg_buffer_8d40b1d762fb3c66,
            "__wbg_length_6bb7e81f9d7713e4": __wbg_length_6bb7e81f9d7713e4,
            "__wbg_prototypesetcall_3d4a26c1ed734349": __wbg_prototypesetcall_3d4a26c1ed734349,
            "__wbg_subarray_70fd07feefe14294": __wbg_subarray_70fd07feefe14294,
            "__wbg_set_1353b2a5e96bc48c": __wbg_set_1353b2a5e96bc48c,
            "__wbg_BigInt_40a77d45cca49470": __wbg_BigInt_40a77d45cca49470,
            "__wbg_done_75ed0ee6dd243d9d": __wbg_done_75ed0ee6dd243d9d,
            "__wbg_value_dd9372230531eade": __wbg_value_dd9372230531eade,
            "__wbg_instanceof_Map_ebb01a5b6b5ffd0b": __wbg_instanceof_Map_ebb01a5b6b5ffd0b,
            "__wbg_instanceof_Uint8Array_9a8378d955933db7": __wbg_instanceof_Uint8Array_9a8378d955933db7,
            "__wbg_instanceof_ArrayBuffer_67f3012529f6a2dd": __wbg_instanceof_ArrayBuffer_67f3012529f6a2dd,
            "__wbg_BigInt_6adbfd8eb0f7ec07": __wbg_BigInt_6adbfd8eb0f7ec07,
            "__wbg_get_5ee3191755594360": __wbg_get_5ee3191755594360,
            "__wbg_new_2ff1f68f3676ea53": __wbg_new_2ff1f68f3676ea53,
            "__wbg_set_b7f1cf4fae26fe2a": __wbg_set_b7f1cf4fae26fe2a,
            "__wbg_keys_822161a7faf55538": __wbg_keys_822161a7faf55538,
            "__wbg_get_0da715ceaecea5c8": __wbg_get_0da715ceaecea5c8,
            "__wbg_new_1f3a344cf3123716": __wbg_new_1f3a344cf3123716,
            "__wbg_set_90f6c0f7bd8c0415": __wbg_set_90f6c0f7bd8c0415,
            "__wbg_from_88bc52ce20ba6318": __wbg_from_88bc52ce20ba6318,
            "__wbg_push_330b2eb93e4e1212": __wbg_push_330b2eb93e4e1212,
            "__wbg_length_186546c51cd61acd": __wbg_length_186546c51cd61acd,
            "__wbg_isArray_030cce220591fb41": __wbg_isArray_030cce220591fb41,
            "__wbg_new_da9dc54c5db29dfa": __wbg_new_da9dc54c5db29dfa,
            "__wbg_toString_d8f537919ef401d6": __wbg_toString_d8f537919ef401d6,
            "__wbg_toString_7268338f40012a03": __wbg_toString_7268338f40012a03,
            "__wbg_isSafeInteger_1c0d1af5542e102a": __wbg_isSafeInteger_1c0d1af5542e102a,
            "__wbg_new_19c25a3f2fa63a02": __wbg_new_19c25a3f2fa63a02,
            "__wbg_entries_2be2f15bd5554996": __wbg_entries_2be2f15bd5554996,
            "__wbg_iterator_f370b34483c71a1c": __wbg_iterator_f370b34483c71a1c,
            "__wbg_static_accessor_GLOBAL_THIS_f0a4409105898184": __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184,
            "__wbg_static_accessor_SELF_995b214ae681ff99": __wbg_static_accessor_SELF_995b214ae681ff99,
            "__wbg_static_accessor_GLOBAL_8921f820c2ce3f12": __wbg_static_accessor_GLOBAL_8921f820c2ce3f12,
            "__wbg_static_accessor_WINDOW_cde3890479c675ea": __wbg_static_accessor_WINDOW_cde3890479c675ea,
            "__wbg_new_2e3c58a15f39f5f9": __wbg_new_2e3c58a15f39f5f9,
            "__wbg_then_e22500defe16819f": __wbg_then_e22500defe16819f,
            "__wbg_resolve_4055c623acdd6a1b": __wbg_resolve_4055c623acdd6a1b,
            "__wbg_get_458e874b43b18b25": __wbg_get_458e874b43b18b25,
            "__wbg_newnoargs_254190557c45b4ec": __wbg_newnoargs_254190557c45b4ec,
            "__wbg_call_13410aac570ffff7": __wbg_call_13410aac570ffff7,
            "__wbg_call_a5400b25a865cfd8": __wbg_call_a5400b25a865cfd8,
            "__wbg_next_5b3530e612fde77d": __wbg_next_5b3530e612fde77d,
            "__wbg_next_692e82279131b03c": __wbg_next_692e82279131b03c,
            "__wbg_wbindgenin_d7a1ee10933d2d55": __wbg_wbindgenin_d7a1ee10933d2d55,
            "__wbg_wbindgenshr_7d2aae6044c0dab1": __wbg_wbindgenshr_7d2aae6044c0dab1,
            "__wbg_wbindgenthrow_451ec1a8469d7eb6": __wbg_wbindgenthrow_451ec1a8469d7eb6,
            "__wbg_wbindgencbdrop_eb10308566512b88": __wbg_wbindgencbdrop_eb10308566512b88,
            "__wbg_wbindgenisnull_f3037694abe4d97a": __wbg_wbindgenisnull_f3037694abe4d97a,
            "__wbg_wbindgenjsvaleq_e6f2ad59ccae1b58": __wbg_wbindgenjsvaleq_e6f2ad59ccae1b58,
            "__wbg_Number_998bea33bd87c3e0": __wbg_Number_998bea33bd87c3e0,
            "__wbg_Error_e17e777aac105295": __wbg_Error_e17e777aac105295,
            "__wbg_wbindgenisbigint_ecb90cc08a5a9154": __wbg_wbindgenisbigint_ecb90cc08a5a9154,
            "__wbg_wbindgenisobject_307a53c6bd97fbf8": __wbg_wbindgenisobject_307a53c6bd97fbf8,
            "__wbg_wbindgenisstring_d4fa939789f003b0": __wbg_wbindgenisstring_d4fa939789f003b0,
            "__wbg_wbindgennumberget_f74b4c7525ac05cb": __wbg_wbindgennumberget_f74b4c7525ac05cb,
            "__wbg_wbindgenstringget_0f16a6ddddef376f": __wbg_wbindgenstringget_0f16a6ddddef376f,
            "__wbg_wbindgenbooleanget_3fe6f642c7d97746": __wbg_wbindgenbooleanget_3fe6f642c7d97746,
            "__wbg_wbindgenisfunction_8cee7dce3725ae74": __wbg_wbindgenisfunction_8cee7dce3725ae74,
            "__wbg_wbindgenisundefined_c4b71d073b92f3c5": __wbg_wbindgenisundefined_c4b71d073b92f3c5,
            "__wbg_wbindgenjsvallooseeq_9bec8c9be826bed1": __wbg_wbindgenjsvallooseeq_9bec8c9be826bed1,
            "__wbg_wbindgenbigintgetasi64_ac743ece6ab9bba1": __wbg_wbindgenbigintgetasi64_ac743ece6ab9bba1,
            "__wbg_wbindgendebugstring_99ef257a3ddda34d": __wbg_wbindgendebugstring_99ef257a3ddda34d,
            "__wbindgen_init_externref_table": __wbindgen_init_externref_table,
            "__wbindgen_cast_e7b45dd881f38ce3": __wbindgen_cast_e7b45dd881f38ce3,
            "__wbindgen_cast_2241b6af4c4b2941": __wbindgen_cast_2241b6af4c4b2941,
            "__wbindgen_cast_9ae0607507abb057": __wbindgen_cast_9ae0607507abb057,
            "__wbindgen_cast_4625c577ab2ec9ee": __wbindgen_cast_4625c577ab2ec9ee,
            "__wbindgen_cast_9f23747c70687cbf": __wbindgen_cast_9f23747c70687cbf,
            "__wbindgen_cast_cb9088102bce6b30": __wbindgen_cast_cb9088102bce6b30,
            "__wbindgen_cast_d6cd19b81560fd6e": __wbindgen_cast_d6cd19b81560fd6e
        }
    }, __vite__wasmUrl);
    const { memory, __wbg_chargedstate_free, __wbg_contractmaintenanceauthority_free, __wbg_contractoperation_free, __wbg_contractstate_free, __wbg_costmodel_free, __wbg_querycontext_free, __wbg_queryresults_free, __wbg_stateboundedmerkletree_free, __wbg_statemap_free, __wbg_statevalue_free, __wbg_vmresults_free, __wbg_vmstack_free, bigIntModFr, bigIntToValue, chargedstate_new, chargedstate_state, chargedstate_toString, communicationCommitment, communicationCommitmentRandomness, contractmaintenanceauthority_committee, contractmaintenanceauthority_counter, contractmaintenanceauthority_deserialize, contractmaintenanceauthority_new, contractmaintenanceauthority_serialize, contractmaintenanceauthority_threshold, contractmaintenanceauthority_toString, contractoperation_deserialize, contractoperation_new, contractoperation_serialize, contractoperation_set_verifier_key, contractoperation_toString, contractoperation_verifier_key, contractstate_balance, contractstate_data, contractstate_deserialize, contractstate_maintenance_authority, contractstate_new, contractstate_operation, contractstate_operations, contractstate_query, contractstate_serialize, contractstate_setOperation, contractstate_set_balance, contractstate_set_data, contractstate_set_maintenance_authority, contractstate_toString, costmodel_initialCostModel, costmodel_new, costmodel_toString, decodeCoinPublicKey, decodeContractAddress, decodeQualifiedShieldedCoinInfo, decodeRawTokenType, decodeShieldedCoinInfo, decodeUserAddress, degradeToTransient, dummyContractAddress, dummyUserAddress, ecAdd, ecMul, ecMulGenerator, encodeCoinPublicKey, encodeContractAddress, encodeQualifiedShieldedCoinInfo, encodeRawTokenType, encodeShieldedCoinInfo, encodeUserAddress, entryPointHash, hashToCurve, leafHash, maxAlignedSize, maxField, persistentCommit, persistentHash, proofDataIntoSerializedPreimage, querycontext_address, querycontext_block, querycontext_com_indices, querycontext_effects, querycontext_insertCommitment, querycontext_new, querycontext_qualify, querycontext_query, querycontext_runTranscript, querycontext_set_block, querycontext_set_effects, querycontext_state, querycontext_toString, querycontext_toVmStack, queryresults_context, queryresults_events, queryresults_gas_cost, queryresults_new, queryresults_toString, rawTokenType, runProgram, runtimeCoinCommitment, runtimeCoinNullifier, sampleContractAddress, sampleRawTokenType, sampleSigningKey, sampleUserAddress, signData, signatureVerifyingKey, signingKeyFromBip340, stateboundedmerkletree_blank, stateboundedmerkletree_collapse, stateboundedmerkletree_findPathForLeaf, stateboundedmerkletree_height, stateboundedmerkletree_pathForLeaf, stateboundedmerkletree_rehash, stateboundedmerkletree_root, stateboundedmerkletree_toString, stateboundedmerkletree_update, statemap_get, statemap_insert, statemap_keys, statemap_new, statemap_remove, statemap_toString, statevalue_arrayPush, statevalue_asArray, statevalue_asBoundedMerkleTree, statevalue_asCell, statevalue_asMap, statevalue_decode, statevalue_encode, statevalue_logSize, statevalue_new, statevalue_newArray, statevalue_newBoundedMerkleTree, statevalue_newCell, statevalue_newMap, statevalue_newNull, statevalue_toString, statevalue_type, transientCommit, transientHash, upgradeFromTransient, valueToBigInt, verifySignature, vmresults_events, vmresults_gas_cost, vmresults_new, vmresults_stack, vmresults_toString, vmstack_get, vmstack_isStrong, vmstack_length, vmstack_new, vmstack_push, vmstack_removeLast, vmstack_toString, __wbg_intounderlyingbytesource_free, __wbg_intounderlyingsink_free, __wbg_intounderlyingsource_free, intounderlyingbytesource_autoAllocateChunkSize, intounderlyingbytesource_cancel, intounderlyingbytesource_pull, intounderlyingbytesource_start, intounderlyingbytesource_type, intounderlyingsink_abort, intounderlyingsink_close, intounderlyingsink_write, intounderlyingsource_cancel, intounderlyingsource_pull, __wbindgen_exn_store, __externref_table_alloc, __wbindgen_export_2, __wbindgen_malloc, __wbindgen_realloc, __wbindgen_export_5, __externref_table_dealloc, __wbindgen_free, __externref_drop_slice, closure690_externref_shim, closure730_externref_shim, __wbindgen_start } = __vite__wasmModule;
    const wasm = Object.freeze(Object.defineProperty({
        __proto__: null,
        __externref_drop_slice,
        __externref_table_alloc,
        __externref_table_dealloc,
        __wbg_chargedstate_free,
        __wbg_contractmaintenanceauthority_free,
        __wbg_contractoperation_free,
        __wbg_contractstate_free,
        __wbg_costmodel_free,
        __wbg_intounderlyingbytesource_free,
        __wbg_intounderlyingsink_free,
        __wbg_intounderlyingsource_free,
        __wbg_querycontext_free,
        __wbg_queryresults_free,
        __wbg_stateboundedmerkletree_free,
        __wbg_statemap_free,
        __wbg_statevalue_free,
        __wbg_vmresults_free,
        __wbg_vmstack_free,
        __wbindgen_exn_store,
        __wbindgen_export_2,
        __wbindgen_export_5,
        __wbindgen_free,
        __wbindgen_malloc,
        __wbindgen_realloc,
        __wbindgen_start,
        bigIntModFr,
        bigIntToValue,
        chargedstate_new,
        chargedstate_state,
        chargedstate_toString,
        closure690_externref_shim,
        closure730_externref_shim,
        communicationCommitment,
        communicationCommitmentRandomness,
        contractmaintenanceauthority_committee,
        contractmaintenanceauthority_counter,
        contractmaintenanceauthority_deserialize,
        contractmaintenanceauthority_new,
        contractmaintenanceauthority_serialize,
        contractmaintenanceauthority_threshold,
        contractmaintenanceauthority_toString,
        contractoperation_deserialize,
        contractoperation_new,
        contractoperation_serialize,
        contractoperation_set_verifier_key,
        contractoperation_toString,
        contractoperation_verifier_key,
        contractstate_balance,
        contractstate_data,
        contractstate_deserialize,
        contractstate_maintenance_authority,
        contractstate_new,
        contractstate_operation,
        contractstate_operations,
        contractstate_query,
        contractstate_serialize,
        contractstate_setOperation,
        contractstate_set_balance,
        contractstate_set_data,
        contractstate_set_maintenance_authority,
        contractstate_toString,
        costmodel_initialCostModel,
        costmodel_new,
        costmodel_toString,
        decodeCoinPublicKey,
        decodeContractAddress,
        decodeQualifiedShieldedCoinInfo,
        decodeRawTokenType,
        decodeShieldedCoinInfo,
        decodeUserAddress,
        degradeToTransient,
        dummyContractAddress,
        dummyUserAddress,
        ecAdd,
        ecMul,
        ecMulGenerator,
        encodeCoinPublicKey,
        encodeContractAddress,
        encodeQualifiedShieldedCoinInfo,
        encodeRawTokenType,
        encodeShieldedCoinInfo,
        encodeUserAddress,
        entryPointHash,
        hashToCurve,
        intounderlyingbytesource_autoAllocateChunkSize,
        intounderlyingbytesource_cancel,
        intounderlyingbytesource_pull,
        intounderlyingbytesource_start,
        intounderlyingbytesource_type,
        intounderlyingsink_abort,
        intounderlyingsink_close,
        intounderlyingsink_write,
        intounderlyingsource_cancel,
        intounderlyingsource_pull,
        leafHash,
        maxAlignedSize,
        maxField,
        memory,
        persistentCommit,
        persistentHash,
        proofDataIntoSerializedPreimage,
        querycontext_address,
        querycontext_block,
        querycontext_com_indices,
        querycontext_effects,
        querycontext_insertCommitment,
        querycontext_new,
        querycontext_qualify,
        querycontext_query,
        querycontext_runTranscript,
        querycontext_set_block,
        querycontext_set_effects,
        querycontext_state,
        querycontext_toString,
        querycontext_toVmStack,
        queryresults_context,
        queryresults_events,
        queryresults_gas_cost,
        queryresults_new,
        queryresults_toString,
        rawTokenType,
        runProgram,
        runtimeCoinCommitment,
        runtimeCoinNullifier,
        sampleContractAddress,
        sampleRawTokenType,
        sampleSigningKey,
        sampleUserAddress,
        signData,
        signatureVerifyingKey,
        signingKeyFromBip340,
        stateboundedmerkletree_blank,
        stateboundedmerkletree_collapse,
        stateboundedmerkletree_findPathForLeaf,
        stateboundedmerkletree_height,
        stateboundedmerkletree_pathForLeaf,
        stateboundedmerkletree_rehash,
        stateboundedmerkletree_root,
        stateboundedmerkletree_toString,
        stateboundedmerkletree_update,
        statemap_get,
        statemap_insert,
        statemap_keys,
        statemap_new,
        statemap_remove,
        statemap_toString,
        statevalue_arrayPush,
        statevalue_asArray,
        statevalue_asBoundedMerkleTree,
        statevalue_asCell,
        statevalue_asMap,
        statevalue_decode,
        statevalue_encode,
        statevalue_logSize,
        statevalue_new,
        statevalue_newArray,
        statevalue_newBoundedMerkleTree,
        statevalue_newCell,
        statevalue_newMap,
        statevalue_newNull,
        statevalue_toString,
        statevalue_type,
        transientCommit,
        transientHash,
        upgradeFromTransient,
        valueToBigInt,
        verifySignature,
        vmresults_events,
        vmresults_gas_cost,
        vmresults_new,
        vmresults_stack,
        vmresults_toString,
        vmstack_get,
        vmstack_isStrong,
        vmstack_length,
        vmstack_new,
        vmstack_push,
        vmstack_removeLast,
        vmstack_toString
    }, Symbol.toStringTag, {
        value: 'Module'
    }));
    __wbg_set_wasm(wasm);
    __wbindgen_start();
})();
export { CostModel as C, QueryContext as Q, StateValue as S, __vite__initWasm as _, getAugmentedNamespace as a, bigIntToValue$1 as b, encodeQualifiedShieldedCoinInfo$1 as c, dummyContractAddress$1 as d, encodeShieldedCoinInfo$1 as e, encodeCoinPublicKey$1 as f, getDefaultExportFromCjs as g, encodeContractAddress$1 as h, decodeShieldedCoinInfo$1 as i, decodeQualifiedShieldedCoinInfo$1 as j, decodeCoinPublicKey$1 as k, decodeContractAddress$1 as l, maxField$1 as m, ContractState as n, ChargedState as o, persistentHash$1 as p, ContractOperation as q, commonjsRequire as r, sampleSigningKey$1 as s, ContractMaintenanceAuthority as t, signatureVerifyingKey$1 as u, valueToBigInt$1 as v, commonjsGlobal as w, __tla };
