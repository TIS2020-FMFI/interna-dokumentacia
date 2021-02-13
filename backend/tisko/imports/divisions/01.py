class TrieMap:
    class Node:
        def __init__(self, value):
            self.value = value
            self.child = {}
    class E:
            pass

    def __init__(self):
        self.root = None
        self.p=0 
        self.v=0
        self.z=[]

    def __setitem__(self, key, value):
        r= self.root
        if key not in self.z:
            self.v+=1
            self.z.append(key)
        for pismeno in key:            
            try:
                r=r.child[pismeno]
                
            except KeyError:
                r.child[pismeno]=self.Node(self.E())
                self.p+=1
                r=r.child[pismeno]
            except AttributeError:
                self.root = self.Node(self.E())
                r= self.root
                r.child[pismeno]=self.Node(self.E())
                self.p+=1
                self.p+=1
                r=r.child[pismeno]
        r.value=value        

    def __getitem__(self, key):
        r= self.root
        if r is None:
            raise KeyError
        for pismeno in key:
            r=r.child[pismeno]
        if type(r.value) is self.E:
            raise KeyError
        return r.value

    def __delitem__(self, key):
        zac=self.root
        for i in key:
            if i in zac.child.keys():
                zac=zac.child[i]
            else :
                raise KeyError
        zac.value=self.E()
        h=key
        while len(h)>0:
            zac=self.root
            for i in h[:-1]:
                zac=zac.child[i]
            p=zac.child[h[-1]]
            if type(p.value) is self.E and p.child=={}:
                del zac.child[h[-1]]
            h=h[:-1]
        if self.root.child=={}:
            self.root=None
        self.z.remove(key)
        self.v-=1
            
    def node_count(self):
        if self.root is None:
            return 0
        h=[self.root]
        poc=0
        while h:
            v=h.pop()
            poc+=1
            h+=v.child.values()
        return poc

    def __len__(self):
        return self.v

    def __iter__(self):
        yield from self.z
##        stack = [(self.root, "")]
##        while stack!=[]:
##            root, retazec = stack.pop()
##            if root.value!=54214154254545252525252:
##                yield retazec
##            for i in root.child:
##                n = root.child[i]
##                #print(stack, i, root.child[i])
##                stack.append((n, retazec+i))
            

if __name__ == '__main__':
    m = TrieMap()
    for w in 'mama ma emu a ema ma mamu'.split():
        try:
            m[w] = m[w] + 1
        except KeyError:
            m[w] = 1

    print(list(m), m.node_count(), len(m))
    for w in 'ma', 'mama', 'mamu', 'emu', 'ema', 'a':
        del m[w]
        print(w, m.node_count(), len(m))
